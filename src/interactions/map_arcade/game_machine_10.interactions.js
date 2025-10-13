import { displayDialogue } from '../../utils';

export const interactionWithGameMachine10 = (player, k, map) => {
    player.onCollide('game_machine_10', () => {
        showCustomPrompt(
            'Do you want to play "Catch the Moon"? Join the adventure and see how many moons you can catch before time runs out!',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Get ready for "Catch the Moon"! Aim to gather as many moons as possible. Good luck!',
                        ],
                        onDisplayEnd: () => {
                            startCatchTheMoon(k);
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
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
                e.preventDefault(); // Prevent the default behavior
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

function startCatchTheMoon(k) {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    let collectedMoons = 0;
    let moonCount = 1;
    let tkeyCount = 10;
    let timerDuration = 5000;
    let timer;
    let score = 0;
    const moonPositions = [];

    k.go('startScreen', {
        title: 'Catch the moon',
        gameSceneName: 'catchTheMoon',
    });

    k.scene('catchTheMoon', () => {
        k.loadSprite('moon', './assets/sprites/moon.png');
        k.loadSprite('tkey', './assets/sprites/TKey.png');

        // Function to reset the level
        function resetLevel() {
            // Clear all moons
            k.destroyAll('moon');
            moonPositions.length = 0;

            // Increment moon count for the next level
            moonCount++;
            addMoons();

            // Reset timer duration and score display
            timerDuration = Math.max(100, timerDuration - 50);
            updateTimer();
        }

        // Function to check if a position is occupied by a sprite
        function isPositionOccupied(x, y) {
            return moonPositions.some((pos) => {
                return Math.abs(pos.x - x) < 30 && Math.abs(pos.y - y) < 30; // Adjust the threshold as needed
            });
        }

        // Function to add sprite
        function addMoons() {
            for (let i = 0; i < moonCount; i++) {
                let moon;

                do {
                    const x = k.rand(50, WIDTH - 50);
                    const y = k.rand(50, HEIGHT - 50);

                    if (!isPositionOccupied(x, y)) {
                        moon = k.add([
                            k.sprite('moon'),
                            k.pos(x, y),
                            k.scale(1),
                            k.area(),
                            'moon',
                        ]);
                        moonPositions.push({ x, y });
                    }
                } while (!moon);

                moon.onClick(() => {
                    k.destroy(moon);
                    collectedMoons++;
                    score++;
                    tkeyCount += 2;

                    if (collectedMoons === moonCount) {
                        collectedMoons = 0;
                        resetLevel();
                    }
                });
            }

            for (let i = 0; i < tkeyCount; i++) {
                let tkey;
                do {
                    const x = k.rand(50, WIDTH - 50);
                    const y = k.rand(50, HEIGHT - 50);

                    if (!isPositionOccupied(x, y)) {
                        tkey = k.add([
                            k.sprite('tkey'),
                            k.pos(x, y),
                            k.scale(1),
                            'tkey',
                        ]);
                    }
                } while (!tkey);
            }
        }

        function updateTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                k.go('lose', {
                    title: 'Catch the moon',
                    gameRestartSceneName: 'catchTheMoon',
                    gameExitSceneName: 'arcade',
                    score,
                });
            }, timerDuration);
        }

        addMoons();
        updateTimer();

        k.onKeyPress('escape', () => {
            k.go('lose', {
                title: 'Catch the moon',
                gameRestartSceneName: 'catchTheMoon',
                gameExitSceneName: 'arcade',
                score,
            });
            clearTimeout(timer);
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        });

        const scoreLabel = k.add([k.text(`Score: ${score}`), k.pos(20, 20)]);

        k.onUpdate(() => {
            scoreLabel.text = `Score: ${score}`;
        });
    });
}
