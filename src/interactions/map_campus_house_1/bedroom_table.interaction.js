import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomQuestion } from '../../utils/randomJSQuestion';
import { displayPermissionBox } from '../../utils';

export const bedroomTableInteractions = async (player, k, map) => {
    player.onCollide('bedroom_table', async () => {
        player.isInDialog = true;

        let quizDecision = await displayPermissionBox({
            k,
            player,
            text: ['Do you want to play a quick quiz about JavaScript?'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
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

            showCustomPrompt(questionText, options, async (selectedOption) => {
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
                        player.isInDialog = false;
                    },
                });
            });
        } else {
            await displayDialogue({
                k,
                player,
                text: ['No problem! Feel free to explore the room.'],
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });
        }
    });
};

function showCustomPrompt(message, options, callback) {
    const energyUI = document.getElementById('energy-container');
    energyUI.style.display = 'none';

    let promptMessage = document.getElementById('prompt-message');
    promptMessage.innerHTML = message;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerHTML = option.text;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0');

        button.onclick = function () {
            callback(option.value);
            closeCustomPrompt();
        };

        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                callback(option.value);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });

    document.getElementById('custom-prompt').style.display = 'flex';

    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

function closeCustomPrompt() {
    document.getElementById('custom-prompt').style.display = 'none';
}