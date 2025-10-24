import { time } from '../../kplayCtx';
import {
    displayDialogue,
    displayPermissionBox,
    showCustomPrompt,
} from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomQuestion } from '../../utils/randomJSQuestion';

let abort;

export const bedroomTableInteractions = async (player, k, map) => {
    player.onCollide('bedroom_table', async () => {
        time.paused = true;

        let quizDecision = await displayPermissionBox({
            k,
            player,
            text: ['Do you want to play a quick quiz about JavaScript?'],
        });

        if (quizDecision) {
            const quizQuestion = getRandomQuestion();

            const questionText = quizQuestion.question;
            const options = Object.entries(quizQuestion.options).map(
                ([key, value]) => ({
                    value: key,
                    text: `<pre style="font-size: 14px;"><code>${value}</code></pre>`,
                })
            );

            player.state.isInDialog = true;
            abort = new AbortController();
            showCustomPrompt(
                questionText,
                options,
                async (selectedOption) => {
                    let feedbackText = [];

                    if (selectedOption === quizQuestion.answer) {
                        updateEnergyState(player.state, 10);
                        feedbackText.push("Correct! You're on fire!");
                    } else {
                        updateEnergyState(player.state, -10);
                        feedbackText.push("Oops! That's not right.");
                    }

                    feedbackText.push(
                        `Correct answer: ${quizQuestion.answer}. ${quizQuestion.explanation}`
                    );
                    feedbackText.push(
                        'Thanks for playing! You can continue exploring.'
                    );

                    await displayDialogue({
                        k,
                        player,
                        text: feedbackText,
                        onDisplayEnd: () => {
                            time.paused = false;
                        },
                    });
                },
                player,
                k,
                abort
            );
        } else {
            await displayDialogue({
                k,
                player,
                text: ['No problem! Feel free to explore the room.'],
                onDisplayEnd: () => {
                    time.paused = false;
                },
            });
        }
    });
};
