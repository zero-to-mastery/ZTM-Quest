import { displayDialogue } from '../../utils';

export const interactionWithGameMachine2 = (player, k, map) => {
    player.onCollide('game_machine_2', () => {
        player.isInDialog = true;
        showCustomPrompt(
            'Do you want to play the Chrome Dino Game?',
            ['Yes', 'No'],
            (selectedOption) => handlePromptSelection(selectedOption, player, k)
        );
    });
};

const handlePromptSelection = (selectedOption, player, k) => {
    if (selectedOption === 'Yes') {
        displayDialogue({
            k,
            player,
            text: ['Starting the Chrome Dino Game... Good luck!'],
            onDisplayEnd: () => {
                player.isInDialog = false;
                startChromeDinoGame(k);
            },
        });
    } else {
        displayDialogue({
            k,
            player,
            text: ['Maybe next time!'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    }
};

const showCustomPrompt = (message, options, callback) => {
    const promptMessage = document.getElementById('prompt-message');
    const optionsContainer = document.getElementById('options-container');
    const customPrompt = document.getElementById('custom-prompt');

    promptMessage.textContent = message;
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0');

        button.onclick = () => {
            callback(option);
            closeCustomPrompt();
        };

        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                callback(option);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });

    customPrompt.style.display = 'flex';
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
};

const closeCustomPrompt = () => {
    document.getElementById('custom-prompt').style.display = 'none';
};

const startChromeDinoGame = (k) => {
    k.debug.log('Chrome Dino Game started!');
    // Implement the logic to actually start the game
};
