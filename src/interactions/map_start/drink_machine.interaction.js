import { displayDialogue } from '../../utils';

// List of drinks and possible fun surprises

export const interactionWithDrinksMachine = (player, k, map) => {
    player.onCollide('drinks_machine', () => {
        player.isInDialog = true;
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
                        player.isInDialog = false;
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
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };
        optionsContainer.appendChild(button);
    });

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';
}

// Function to close the custom prompt
function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}
