import { time } from '../../kplayCtx';
import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const interactionWithPuff = (player, k, map) => {
    player.onCollide('puff', () => {
        showCustomPrompt(
            'Would you like to sit and rest on the puff? (Time advances 15s)',
            ['Sit', 'Leave'],
            (selectedOption) => {
                const texts = {
                    Sit: ['Wow, I feel fresh and energetic!'],
                    Leave: ['No way! I want to keep exploring!'],
                };
                if (texts[selectedOption]) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            if (selectedOption === 'Sit') {
                                updateEnergyState(player.state, 15);
                                if (time.seconds + 15 >= 60) {
                                    time.minutes += 1;
                                    time.seconds = (time.seconds + 15) % 60;
                                } else {
                                    time.seconds += 15;
                                }
                            }
                        },
                    });
                }
            }
        );
    });
};

function showCustomPrompt(message, options, callback) {
    document.getElementById('prompt-message').textContent = message;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0');

        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };

        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                callback(option);
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
