import { displayDialogue } from '../../utils';
import { addCoins } from '../../utils/coinsUpdate';

export const interactionWithGameMachine1 = (player, k, map) => {
    player.onCollide('game_machine_1', () => {
        player.isInDialog = true;
        showCustomPrompt(
            'Do you want to play the Number Guessing Game?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Starting the Number Guessing Game... Get ready!',
                        ],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startNumberGuessingGame(k);
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
            }
        );
    });
};

function startNumberGuessingGame(k) {
    const MAX_ATTEMPTS = 5;
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let feedbackText;

    k.scene('numberGuessing', () => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text('Guess a number between 1 and 100', { size: 24 }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);
        const input = k.add([
            k.text('Enter Guess: ', { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        feedbackText = k.add([
            k.text('Your guess will appear here', { size: 24 }),
            k.pos(centerX, centerY + 100 + offsetY),
            k.anchor('center'),
        ]);

        let currentGuess = '';

        k.onKeyPress('enter', () => {
            if (currentGuess.length > 0) {
                const guess = parseInt(currentGuess, 10);
                attempts++;
                if (guess === randomNumber) {
                    k.go('win', attempts);
                    addCoins(15);
                } else if (attempts >= MAX_ATTEMPTS) {
                    k.go('lose', randomNumber);
                } else {
                    if (guess < randomNumber) {
                        feedbackText.text = `Too low! Try again. Attempts left: ${MAX_ATTEMPTS - attempts}`;
                    } else {
                        feedbackText.text = `Too high! Try again. Attempts left: ${MAX_ATTEMPTS - attempts}`;
                    }
                }
                currentGuess = '';
            }
        });

        k.onKeyPress((key) => {
            if (key === 'backspace') {
                currentGuess = currentGuess.slice(0, -1);
            } else if (!isNaN(key) && currentGuess.length < 3) {
                currentGuess += key;
            }
            input.text = `Enter Guess: ${currentGuess}`;
        });

        k.onKeyPress('escape', () => {
            k.go('arcade');
        });
    });

    k.scene('win', (attempts) => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text('Congratulations! You guessed the number!', { size: 32 }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);
        k.add([
            k.text(`Attempts: ${attempts}`, { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        const playAgainButton = k.add([
            k.text('Play Again', { size: 24 }),
            k.pos(centerX, centerY + 80 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        playAgainButton.onClick(() => startNumberGuessingGame(k));

        const exitButton = k.add([
            k.text('Exit', { size: 24 }),
            k.pos(centerX, centerY + 140 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        exitButton.onClick(() => k.go('arcade'));
    });

    k.scene('lose', (number) => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text('Game Over! You ran out of attempts.', { size: 32 }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);
        k.add([
            k.text(`The number was: ${number}`, { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        const playAgainButton = k.add([
            k.text('Play Again', { size: 24 }),
            k.pos(centerX, centerY + 80 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        playAgainButton.onClick(() => startNumberGuessingGame(k));

        const exitButton = k.add([
            k.text('Exit', { size: 24 }),
            k.pos(centerX, centerY + 140 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        exitButton.onClick(() => k.go('arcade'));
    });

    k.go('numberGuessing');
}
function showCustomPrompt(message, options, callback) {
    document.getElementById('prompt-message').textContent = message;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

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

    document.getElementById('custom-prompt').style.display = 'flex';
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

function closeCustomPrompt() {
    document.getElementById('custom-prompt').style.display = 'none';
}
