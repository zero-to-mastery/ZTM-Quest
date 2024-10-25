import { displayDialogue } from '../../utils';
import { purchaseItem } from '../../utils/coinsUpdate';

// List of drinks and possible fun surprises

export const interactionWithDrinksMachine = (player, k, map) => {
    player.onCollide('drinks_machine', () => {
        // Trigger the custom prompt when the player collides with the drinks machine
        showCustomPrompt(
            'What would you like to drink?', // Prompt message
            ['Coke', 'Soda', 'Water', 'Sprite'], // Options
            (selectedOption) => {
                // Callback when an option is selected
                // Logic based on the selected option
                const texts = {
                    Coke: [
                        'Coke - "Taste the Feeling!" A cold refreshment is coming your way!',
                    ],
                    Soda: [
                        'Soda - "Fizz up your life!" Time for some sparkling fun!',
                    ],
                    Water: [
                        'Water - "Pure as the mountain stream." Stay hydrated and fresh!',
                    ],
                    Sprite: [
                        'Sprite - "Obey Your Thirst!" Crisp and refreshing as ever!',
                    ],
                };
                displayDialogue({
                    k,
                    player,
                    text: texts[selectedOption],
                    onDisplayEnd: () => {
                        if (selectedOption == 'Water') {
                            purchaseItem(k, 5, 20);
                        } else {
                            purchaseItem(k, 8, 15);
                        }
                    },
                });
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
