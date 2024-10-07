import { displayDialogue } from '../../utils';

export const interactionWithGameMachine6 = (player, k, map) => {
    player.onCollide('game_machine_6', () => {
        player.isInDialog = true;
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to play the Chrome Dino Game?', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Chrome Dino Game... Good luck!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startChromeDinoGame(k); // Pass k to the game start function
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

// Function to start the Chrome Dino Game
function startChromeDinoGame(k) {
    k.debug.log('Chrome Dino Game started!');

    //variables for different things in the game
    const FLOOR_HEIGHT = 48;
    const JUMP_FORCE = 800;
    const SPEED = 480;
    const GRAVITY = 1600;
    let trees = []; // Store references to trees
    let score = 0;
    // Set up the game scene
    k.scene('dinoGame', () => {
        //gravity for dino
        k.setGravity(GRAVITY);
        //load a sprite name dino with run animation
        k.loadSprite('dino', './assets/sprites/doux.png', {
            sliceX: 24,
            sliceY: 1,
            anims: {
                run: { from: 17, to: 23, loop: true, speed: 10 },
            },
        });

        //add the dino to screen
        const dino = k.add([
            k.sprite('dino', { anim: 'run' }),
            k.pos(10, k.height() - 300),
            k.area(),
            k.body(),
            k.scale(1),
        ]);

        //pressing the spacebar lets the dino jump
        k.onKeyPress('space', () => {
            if (dino.isGrounded()) {
                dino.jump(JUMP_FORCE);
            }
        });

        //pressing the esc lets player leave game
        k.onKeyPress('escape', () =>
            import('../../scenes/arcade').then((_) => {
                k.setGravity(0);
                k.go('arcade');
            })
        );

        //add platform
        const floor = k.add([
            k.rect(k.width(), FLOOR_HEIGHT),
            k.area(),
            k.outline(4),
            k.pos(0, k.height() - 250),
            k.anchor('botleft'),
            k.body({ isStatic: true }),
            k.color(127, 200, 255),
            'floor',
        ]);

        //spawn trees with different heights at different intervals
        function spawnTree() {
            const scaleFactor = k.width() / k.height();
            const width = k.width() / k.height() < 1 ? 0.5 : 1;
            const height = k.width() / k.height() < 1 ? 0.5 : 1;
            const tree = k.add([
                k.rect(48 * width, k.rand(48, 72) * height),
                k.area(),
                k.outline(4),
                k.pos(k.width() - 10, k.height() - 300),
                k.anchor('botleft'),
                k.body(),
                k.color(255, 180, 255),
                k.move(k.LEFT, SPEED * scaleFactor + score / 10),
                k.offscreen({ destroy: true }),
                'tree',
            ]);
            trees.push(tree);
            k.wait(k.rand(1.5, 3), () => {
                spawnTree();
            });
        }
        spawnTree();

        //on hit show an animation and change scenes
        dino.onCollide('tree', () => {
            k.addKaboom(dino.pos);
            k.shake();
            k.go('lose', score); // go to "lose" scene here
        });

        // keep track of score

        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);
        // increment score every frame
        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
        });
        // Handle screen resize
        k.onResize(() => {
            const scaleFactor = k.width() / k.height();
            if (scaleFactor < 1) {
                dino.scaleTo(1);
            } else {
                dino.scaleTo(scaleFactor);
            }
            floor.width = k.width();
        });
    });

    //set up lose screen
    k.scene('lose', (score) => {
        k.setGravity(0);
        //add "game over" text
        k.add([k.text('Game Over'), k.pos(k.center()), k.anchor('center')]);
        // display score
        k.add([
            k.text(score),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.scale(2),
            k.anchor('center'),
        ]);

        // Add "Play Again" button
        const playAgainButton = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 140),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        // Add "Play Again" button
        const exitButton = k.add([
            k.text('Exit'),
            k.pos(k.width() / 2, k.height() / 2 + 200),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        // When the button is clicked or space is pressed, restart the game
        playAgainButton.onClick(() => {
            startChromeDinoGame(k); // Restart the game
        });

        exitButton.onClick(() => {
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        });
    });

    // Start the game scene
    k.go('dinoGame');
}
