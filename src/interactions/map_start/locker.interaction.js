import { characters } from '../../constants';
import { displayDialogue } from '../../utils';

const slightPause = () => new Promise((res) => setTimeout(res, 500));

export const interactionWithLocker = (player, k, map) => {
    player.onCollide('cabin_edge_room_1', () => {
        player.isInDialog = true;

        const characterOptions = characters.map(
            (character) =>
                character.name.charAt(0).toUpperCase() + character.name.slice(1)
        );
        // Trigger the custom prompt when the player collides with the drinks machine
        showCustomPrompt(
            player,
            'What character would you like to play?', // Prompt message
            characterOptions, // Dynamic options based on characters
            (selectedOption) => {
                // Find the selected character from the array
                const selectedCharacter = characters.find(
                    (character) =>
                        character.name.toLowerCase() ===
                        selectedOption.toLowerCase()
                );
                // const displayText = `You've chosen to play ${selectedCharacter.name}`
                // displayDialogue({
                //     k,
                //     player,
                //     text: [displayText],
                //     onDisplayEnd: () => {
                //         player.isInDialog = false;
                //     },
                // });
                player.changePlayer(selectedCharacter.name);
                player.isInDialog = false;
                k.canvas.focus();
            }
        );
    });
};

async function showCustomPrompt(message, options, callback) {
    // Set the prompt message
    document.getElementById('prompt-message').textContent = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach(async (option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };
        await slightPause();
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
    optionsContainer.style.display = 'flex';
    optionsContainer.style.flexWrap = 'wrap';

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
