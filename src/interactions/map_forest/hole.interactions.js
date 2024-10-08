import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const interactionWithHole = (player, k, map) => {
    interactionHandler(player, 'hole', k, () => {
        player.isInDialogue = true;

        showCustomPrompt(
            'Throw your money down the hole?',
            ['Yes', 'No'],
            (selectedOption) => {
                const texts = {
                    Yes: [
                        'You actually threw it down the hole...',
                        'You are so generous!',
                        'Thanks for playing my little mini game for collecting coins ;) fullspeccoder',
                    ],
                    No: ["Oh... you're just gonna walk away? Ok..."],
                };

                if (selectedOption == 'Yes' && player.state.currency >= 10) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            player.state.currency = 0;
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text:
                            selectedOption == 'No'
                                ? texts[selectedOption]
                                : ["You don't even have enough money..."],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            }
        );
    });
};

function showCustomPrompt(message, options, callback) {
    // Set the prompt message
    document.getElementById('prompt-message').textContent = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };

        // Add keyboard event listener for accessibility
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Enter or Space key
                e.preventDefault(); // Prevent the default behavior (e.g., form submission)
                callback(option);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

// Function to close the custom prompt
function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}
