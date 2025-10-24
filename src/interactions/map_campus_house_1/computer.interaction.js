import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

const challengeText = `What's the value of output?:
<pre style="font-size: 14px;"><code>const one = false || {} || null;
const two = null || false || '';
const three = [] || 0 || true;
console.log(one, two, three);</code></pre>`;

const options = [
    {
        value: 'A',
        text: `<pre style="font-size: 14px;"><code>false null []</code></pre>`,
    },
    {
        value: 'B',
        text: `<pre style="font-size: 14px;"><code>null "" true</code></pre>`,
    },
    {
        value: 'C',
        text: `<pre style="font-size: 14px;"><code>{} "" []</code></pre>`,
    },
    {
        value: 'D',
        text: `<pre style="font-size: 14px;"><code>null null true</code></pre>`,
    },
];

let abort;

export const computerInteractions = async (player, k, map) => {
    const [computer] = map.query({ include: 'computer' });
    player.onCollide('computer', async () => {
        if (!player.state.alreadyTalkedToMage) {
            computer.play('on');

            await displayDialogue({
                k,
                player,
                text: [
                    'It looks like the computer has a interesting challenge for you but it is locked.',
                    'It has some kind of protection spell.',
                    'You should talk to the house mage to unlock it.',
                ],
            });

            computer.play('off');
        }

        if (player.state.alreadyTalkedToMage) {
            computer.play('on');

            time.paused = true;
            player.state.isInDialog = true;
            abort = new AbortController();
            showCustomPrompt(
                challengeText,
                options,
                async (selectedOption) => {
                    const response = [];

                    if (selectedOption == 'C') {
                        updateEnergyState(player.state, -10);
                        player.state.completedMageChallenge = true;
                        response.push("Correct!, you're a genius!");
                        response.push('It was a tough one!, You look tired');
                    } else {
                        updateEnergyState(player.state, -30);
                        response.push('Incorrect! Try again next time!');
                        response.push(
                            'Anyway it was a good effort, You look tired'
                        );
                    }

                    response.push(
                        'You should take a nap before you continue exploring the campus'
                    );

                    await displayDialogue({
                        k,
                        player,
                        text: response,
                        onDisplayEnd: () => {
                            // Only reset if player didn't complete the challenge successfully
                            // Keep alreadyTalkedToMage true so they can return to Mage for reward
                            if (!player.state.completedMageChallenge) {
                                player.state.alreadyTalkedToMage = false;
                            }
                        },
                    });
                },
                player,
                k,
                abort
            );
        }
    });

    player.onCollideEnd('computer', () => {
        const statsUI = document.getElementById('stats-container');
        statsUI.style.display = 'flex';
        computer.play('off');
    });
};
