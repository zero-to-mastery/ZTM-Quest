import { time } from '../../kplayCtx';
import { characters } from '../../constants';
import { changePlayerSprite } from '../../utils/changePlayer';

const slightPause = () => new Promise((res) => setTimeout(res, 500));
let abort;

export const interactionWithLocker = (player, k, map) => {
    player.onCollide('cabin_edge_room_1', () => {
        const characterOptions = characters.map(
            (character) =>
                character.name.charAt(0).toUpperCase() + character.name.slice(1)
        );
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        // Trigger the custom prompt when the player collides with the drinks machine
        showCustomPrompt(
            'What character would you like to play?', // Prompt message
            characterOptions, // Dynamic options based on characters
            (selectedOption) => {
                // Find the selected character from the array
                const selectedCharacter = characters.find(
                    (character) =>
                        character.name.toLowerCase() ===
                        selectedOption.toLowerCase()
                );
                changePlayerSprite(
                    selectedCharacter.name,
                    player.curAnim(),
                    k,
                    player
                );
                k.canvas.focus();
            },
            player,
            k
        );
    });
};

async function showCustomPrompt(message, options, callback, player, k) {
    // Set the prompt message
    document.getElementById('prompt-message').textContent = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const itemsPerPage = 5; // Number of options per page
    let currentPage = 1;
    const totalPages = Math.ceil(options.length / itemsPerPage);

    async function renderOptions() {
        await slightPause();
        // Calculate the start and end indices for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentOptions = options.slice(start, end);

        // Clear existing options
        optionsContainer.innerHTML = '';

        // Create buttons for each option
        currentOptions.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.setAttribute('tabindex', '0'); // Make the button focusable

            // Add click event for mouse interactions
            button.onclick = function () {
                callback(option);
                closeCustomPrompt(player, k);
            };

            // Add keyboard event listener for accessibility
            button.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    // Enter or Space key
                    e.preventDefault(); // Prevent the default behavior (e.g., form submission)
                    callback(option);
                    closeCustomPrompt(player, k);
                }
            });

            optionsContainer.appendChild(button);
        });
    }

    async function renderPagination() {
        await slightPause();
        // Create Previous button
        const prevButton = document.createElement('button');
        prevButton.classList.add('option-btn');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderOptions();
                renderPagination();
            }
        };

        // Create Next button
        const nextButton = document.createElement('button');
        nextButton.classList.add('option-btn');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderOptions();
                renderPagination();
            }
        };
        prevButton.style.width = '45%';
        nextButton.style.width = '45%';
        optionsContainer.appendChild(prevButton);
        optionsContainer.appendChild(nextButton);
    }

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';
    optionsContainer.style.display = 'flex';
    optionsContainer.style.flexWrap = 'wrap';

    // Initial render of options and pagination
    renderOptions();
    renderPagination();

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

// Function to close the custom prompt
function closeCustomPrompt(player, k) {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
    time.paused = false;
    abort.abort();
    player.state.isInDialog = false;
    k.canvas.focus();
}
