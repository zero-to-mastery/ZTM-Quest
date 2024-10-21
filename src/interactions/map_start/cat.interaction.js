import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const interactionWithCat = (player, k, map) => {
    player.onCollide('cat', () => {
        showCustomPrompt(
            'Cat wants to play with you',
            ['Play', 'Leave'],
            (selectedOption) => {
                const texts = {
                    Play: ['Wow, I feel fresh and energetic!'],
                    Leave: ['Maybe next time!'],
                };
                if (texts[selectedOption]) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            if (selectedOption === 'Play') {
                                updateEnergyState(player.state, 10);
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
