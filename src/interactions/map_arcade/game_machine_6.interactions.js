import { scaleFactor } from '../../constants';
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

    // Set up the game scene
    k.scene('dinoGame', () => {
        //gravity for dino
        k.setGravity(GRAVITY);

        //load a sprite name dino with run animation
        k.loadSprite('dino', 'public/doux.png', {
            sliceX: 24,
            sliceY: 1,
            anims: {
                run: { from: 17, to: 23, loop: true, speed: 10 },
            },
        });

        //add the dino to screen
        const dino = k.add([
            k.sprite('dino', { anim: 'run' }),
            k.pos(80, 200),
            k.area(),
            k.body(),
            k.scale(scaleFactor),
        ]);

        //pressing the spacebar lets the dino jump
        k.onKeyPress('space', () => {
            if (dino.isGrounded()) {
                dino.jump(JUMP_FORCE);
            }
        });

        //add platform
        k.add([
            k.rect(k.width(), FLOOR_HEIGHT),
            k.pos(0, k.height() - 250),
            k.anchor('botleft'),
            k.outline(4),
            k.area(),
            k.body({ isStatic: true }),
            k.color(127, 200, 255),
        ]);

        //spawn trees with different heights at different intervals
        function spawnTree() {
            k.add([
                k.rect(48, k.rand(48, 72)),
                k.area(),
                k.outline(4),
                k.pos(k.width() - 10, k.height() - 500),
                k.anchor('botleft'),
                k.body(),
                k.color(255, 180, 255),
                k.move(k.LEFT, SPEED),
                'tree',
            ]);

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
        let score = 0;
        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);
        // increment score every frame
        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
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

        // go back to game with space is pressed
        k.onKeyPress('space', () =>
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            })
        );
        k.onClick(() =>
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            })
        );
        k.setGravity(0);
    });

    // Start the game scene
    k.go('dinoGame');
}
