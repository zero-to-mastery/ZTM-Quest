import { displayDialogue } from '../../utils';
import { addCoins } from '../../utils/coinsUpdate';

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
    k.scene(
        'dinoGame',
        (
            data = {
                score: 0,
                lastDinoPosition: { x: 40, y: k.height() - 350 },
                activeTrees: [],
            }
        ) => {
            console.log(data);
            let score = data.score;
            //gravity for dino
            k.setGravity(GRAVITY);
            let isPaused = false;
            let lastDinoPosition = data.lastDinoPosition;
            let activeTrees = data.activeTrees;

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
                k.pos(lastDinoPosition.x, lastDinoPosition.y),
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
                k.go('lose', {
                    title: 'Dino game',
                    gameRestartSceneName: 'dinoGame',
                    gameExitSceneName: 'arcade',
                    score,
                });
            });

            //add platform
            const floor = k.add([
                k.sprite('floor_sprite'),
                k.area(),
                k.pos(0, k.height()),
                k.anchor('botleft'),
                k.body({ isStatic: true }),
            ]);
            const floorHeight = k.height() - floor.height; // Calculate the height of the floor

            const treeSprites = ['tree1', 'tree2', 'tree3', 'tree4'];
            //spawn trees with different heights at different intervals

            function spawnActiveTrees() {
                activeTrees.forEach(
                    ({
                        sprite,
                        position,
                        height,
                        scaleFactor,
                        score,
                        SPEED,
                    }) => {
                        k.add([
                            k.sprite(sprite),
                            k.area(),
                            k.pos(position.x, position.y),
                            k.anchor('botleft'),
                            k.body(),
                            k.move(k.LEFT, SPEED * scaleFactor + score / 10),
                            k.offscreen({ destroy: true }),
                            k.scale(scaleFactor * 3, scaleFactor * height), // Use the previously saved height
                            'tree',
                        ]);
                    }
                );
            }

            spawnActiveTrees();

            function spawnTree() {
                const scaleFactor = k.width() / k.height();
                const randomHeight = k.rand(1, 5); // Random height for trees
                // Randomly choose a tree sprite
                const randomTreeSprite =
                    treeSprites[Math.floor(Math.random() * treeSprites.length)];

                const treeYPosition =
                    floorHeight - (floor.height * randomHeight) / 3; // Adjust height based on tree scaling

                const rand = k.rand(1.5, 3);
                k.wait(rand, () => {
                    k.add([
                        k.sprite(randomTreeSprite),
                        k.area(),
                        k.pos(k.width(), treeYPosition),
                        k.anchor('botleft'),
                        k.body(),
                        k.move(k.LEFT, SPEED * scaleFactor + score / 10),
                        k.offscreen({ destroy: true }),
                        k.scale(scaleFactor * 3, scaleFactor * randomHeight), // Scale height randomly
                        'tree',
                    ]);
                    // Store the tree's data
                    activeTrees.push({
                        sprite: randomTreeSprite,
                        position: { x: k.width(), y: treeYPosition },
                        height: randomHeight,
                        scaleFactor: scaleFactor,
                        score: score,
                        SPEED: SPEED,
                    });
                    spawnTree(k, SPEED, score);
                });
            }

            spawnTree(k, SPEED, score);

            //on hit show an animation and change scenes
            dino.onCollide('tree', () => {
                k.addKaboom(dino.pos);
                k.shake();
                if (score > 5000) {
                    addCoins(25);
                }
                k.go('lose', {
                    title: 'Dino game',
                    gameRestartSceneName: 'dinoGame',
                    gameExitSceneName: 'arcade',
                    score,
                });
            });

            const SPEEDS = {
                mid: 0.03, // Speed for the mid background
                near: 0.04, // Speed for the near background
            };

            // Variables to track direction
            const direction = {
                cloud2: 1,
                cloud3: 1,
            };

            // Function to move backgrounds back and forth
            function updateBackgrounds(cloud1, cloud2, cloud3) {
                // Move backgrounds based on direction
                cloud2.pos.x -= SPEEDS.mid * direction.cloud2;
                cloud3.pos.x -= SPEEDS.near * direction.cloud3;

                if (cloud2.pos.x <= -10 || cloud2.pos.x >= 10) {
                    direction.cloud2 *= -1; // Reverse direction
                }
                if (cloud3.pos.x <= -10 || cloud3.pos.x >= 10) {
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
                floor.width = k.width() + 100;
                floor.pos.y = k.height();
                const scaleFactor = k.width() / k.height();
                if (scaleFactor < 1) {
                    dino.scaleTo(1);
                } else {
                    dino.scaleTo(scaleFactor * 2);
                }
                lastDinoPosition = dino.pos; // Save dino position
            });

            // Pause handling
            k.onKeyPress('p', () => {
                if (!isPaused) {
                    isPaused = true;
                    setupPauseScene(k, {
                        score,
                        lastDinoPosition,
                        activeTrees,
                    }); // Call the pause scene setup function
                    k.go('pause');
                }
            });
        }
    );
}

// Function to set up the parallax background
function setupParallaxBackground(k) {
    k.loadSprite('cloud1', './assets/sprites/cloud1.png'); // Background layer 1
    k.loadSprite('cloud2', './assets/sprites/cloud2.png'); // Background layer 2
    k.loadSprite('cloud3', './assets/sprites/cloud3.png'); // Background layer 3

    // Far background (slowest)
    const cloud1 = k.add([
        k.sprite('cloud1'),
        k.pos(0, -0), // Adjust the Y position as necessary
        k.layer('bg'), // Optional: add to a specific layer
    ]);

    // Mid background (medium speed)
    const cloud2 = k.add([k.sprite('cloud2'), k.pos(0, 0), k.layer('bg')]);

    // Near background (fastest)
    const cloud3 = k.add([k.sprite('cloud3'), k.pos(0, 0), k.layer('bg')]);

    k.onUpdate(() => {
        cloud1.width = k.width();
        cloud1.height = k.height();
        cloud2.width = k.width();
        cloud2.height = k.height();
        cloud3.width = k.width();
        cloud3.height = k.height();
    });

    return { cloud1, cloud2, cloud3 };
}

function setupPauseScene(k, data) {
    const center = k.center();

    k.scene('pause', () => {
        // Create the pause menu background
        k.add([
            k.rect(k.width(), k.height()),
            k.color(0, 0, 0, 0.5),
            k.layer('ui'),
        ]);

        // Pause text
        k.add([
            k.text('Paused', { size: 48 }),
            k.pos(k.width() / 2, k.height() / 2 - 50),
            k.anchor('center'),
            k.layer('ui'),
        ]);

        // Resume button
        const resumeButtonTxt = k.make([
            k.text('Resume', { size: 32, font: 'pixelFont' }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        // Quit button
        const quitButtonTxt = k.make([
            k.text('Quit to Main Menu', { size: 32, font: 'pixelFont' }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        const resumeButton = k.add([
            k.rect(resumeButtonTxt.width + 20, 80),
            k.pos(center.x, center.y + 100),
            k.anchor('center'),
            k.color(0, 255, 0),
            k.area(),
            'resumeButton',
        ]);

        const quitButton = k.add([
            k.rect(quitButtonTxt.width + 20, 80),
            k.pos(center.x, center.y + 200),
            k.anchor('center'),
            k.color(0, 255, 0),
            k.area(),
            'quitButton',
        ]);

        resumeButton.add(resumeButtonTxt);
        quitButton.add(quitButtonTxt);

        // Resume functionality
        resumeButton.onClick(() => {
            k.go('dinoGame', {
                score: data.score,
                lastDinoPosition: data.lastDinoPosition,
                activeTrees: data.activeTrees,
            }); // Pass back state
        });

        // Quit functionality
        quitButton.onClick(() => {
            k.setGravity(0);
            k.go('arcade');
        });

        // Keyboard event to resume game
        k.onKeyPress('escape', () => {
            k.go('dinoGame', {
                score: data.score,
                lastDinoPosition: data.lastDinoPosition,
                activeTrees: data.activeTrees,
            }); // Pass back state
        });
    });
}
