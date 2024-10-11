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

    const scaleConst = 4;
    //variables for different things in the game
    const scaleFactor = (k.width() / k.height()) * scaleConst;
    const JUMP_FORCE = 280 * scaleConst;
    const SPEED = 480;
    const GRAVITY = 1600;


    k.go('startScreen', { title: 'Dino game', gameSceneName: 'dinoGame' });

    // Set up the game scene
    k.scene('dinoGame', () => {
        let score = 0;
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

        k.loadSprite('tree1', './assets/sprites/tree001.png');
        k.loadSprite('tree2', './assets/sprites/tree002.png');
        k.loadSprite('tree3', './assets/sprites/tree003.png');
        k.loadSprite('tree4', './assets/sprites/tree004.png');
        k.loadSprite('floor_sprite', './assets/sprites/dino_floor.png');
        // Set up the parallax background
        const { cloud1, cloud2, cloud3 } = setupParallaxBackground(k);

        //add the dino to screen
        const dino = k.add([
            k.sprite('dino', { anim: 'run' }),
            k.pos(40, k.height() - 350),
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

        //click screening will let dino jump
        k.onClick(() => {
            if (dino.isGrounded()) {
                dino.jump(JUMP_FORCE);
            }
        });

        //pressing the esc lets player leave game
        k.onKeyPress('escape', () => {
            k.go('lose', { title: 'Dino game', gameRestartSceneName: 'dinoGame', gameExitSceneName: 'arcade', score });
        });

        //add platform
        const floor = k.add([
            k.sprite('floor_sprite'),
            k.area(),
            k.pos(0, k.height()),
            k.anchor('botleft'),
            k.body({ isStatic: true }),
            k.scale(3, 3),
        ]);

        const treeSprites = ['tree1', 'tree2', 'tree3', 'tree4'];
        //spawn trees with different heights at different intervals
        function spawnTree() {
            // Array of tree sprite names

            const scaleFactor = k.width() / k.height();
            const randomHeight = k.rand(2, 6); // Random height for trees
            // Randomly choose a tree sprite
            const randomTreeSprite =
                treeSprites[Math.floor(Math.random() * treeSprites.length)];

            k.wait(k.rand(1.5, 3), () => {
                k.add([
                    k.sprite(randomTreeSprite),
                    k.area(),
                    k.pos(k.width() + 100, k.height() - 300),
                    k.anchor('botleft'),
                    k.body(),
                    k.move(k.LEFT, SPEED * scaleFactor + score / 10),
                    k.offscreen({ destroy: true }),
                    k.scale(scaleFactor * 3, scaleFactor * (randomHeight)), // Scale height randomly
                    'tree',
                ]);
                spawnTree();
            });
        }

        spawnTree(k, SPEED, score);

        //on hit show an animation and change scenes
        dino.onCollide('tree', () => {
            k.addKaboom(dino.pos);
            k.shake();
            k.go('lose', { title: 'Dino game', gameRestartSceneName: 'dinoGame', gameExitSceneName: 'arcade', score });
        });

        const SPEEDS = {
            far: 0.2, // Speed for the far background
            mid: 0.3, // Speed for the mid background
            near: 0.4, // Speed for the near background
        };

        // Variables to track direction
        const direction = {
            cloud1: 1, // 1 for moving left, -1 for moving right
            cloud2: 1,
            cloud3: 1,
        };

        // Function to move backgrounds back and forth
        function updateBackgrounds(cloud1, cloud2, cloud3) {
            // Move backgrounds based on direction
            cloud1.pos.x -= SPEEDS.far * direction.cloud1;
            cloud2.pos.x -= SPEEDS.mid * direction.cloud2;
            cloud3.pos.x -= SPEEDS.near * direction.cloud3;

            // Check if clouds need to reverse direction
            if (cloud1.pos.x <= -k.width() || cloud1.pos.x >= 0) {
                direction.cloud1 *= -1; // Reverse direction
            }
            if (cloud2.pos.x <= -k.width() || cloud2.pos.x >= 0) {
                direction.cloud2 *= -1; // Reverse direction
            }
            if (cloud3.pos.x <= -k.width() || cloud3.pos.x >= 0) {
                direction.cloud3 *= -1; // Reverse direction
            }
        }

        // keep track of score
        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);
        // increment score every frame
        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
            updateBackgrounds(cloud1, cloud2, cloud3);
        });

        // Handle screen resize
        k.onResize(() => {
            const scaleFactor = k.width() / k.height();
            if (scaleFactor < 1) {
                dino.scaleTo(1);
            } else {
                dino.scaleTo(scaleFactor * 2);
            }
            floor.width = k.width();
        });
    });

}

// Function to set up the parallax background
function setupParallaxBackground(k) {
    k.loadSprite('cloud1', './assets/sprites/cloud1.png'); // Background layer 1
    k.loadSprite('cloud2', './assets/sprites/cloud2.png'); // Background layer 2
    k.loadSprite('cloud3', './assets/sprites/cloud3.png'); // Background layer 3

    // Far background (slowest)
    const cloud1 = k.add([
        k.sprite('cloud1'),
        k.pos(-10, -10), // Adjust the Y position as necessary
        k.scale(4, 5), // Scale to your needs
        k.layer('bg'), // Optional: add to a specific layer
    ]);

    // Mid background (medium speed)
    const cloud2 = k.add([
        k.sprite('cloud2'),
        k.pos(-10, -10),
        k.scale(4, 5),
        k.layer('bg'),
    ]);

    // Near background (fastest)
    const cloud3 = k.add([
        k.sprite('cloud3'),
        k.pos(-10, -10),
        k.scale(4, 5),
        k.layer('bg'),
    ]);

    return { cloud1, cloud2, cloud3 };
}
