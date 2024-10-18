import { displayDialogue } from '../../utils';

export const interactionWithGameMachineCrawl = (player, k, map) => {
    player.onCollide('game_machine_crawl', () => {
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to play the Crawl Game?', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Crawl Game... Good luck!'],
                        onDisplayEnd: () => {
                            startCrawlGame(k); // Pass k to the game start function
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

// Function to start the crawl game
function startCrawlGame(k) {
    k.debug.log('Crawl game Started!');
    k.go('startScreen', { title: 'Crawl Game', gameSceneName: 'crawlGame' });

    k.scene('crawlGame', () => {
        let width = k.width();

        // Scale size of game depending on size of screen
        let currentScreenSize = k.height() / k.width();
        if (currentScreenSize <= 1) {
            k.camScale(1);
        } else {
            k.camScale(0.75, 1);
        }
        // Set the initial time remaining (e.g., 60 seconds or 1 minute)
        let timeRemaining = 10 * 1000; // 60 seconds in milliseconds

        // keep track of score
        const timeLabel = k.add([
            k.text(timeRemaining, { size: 32 }),
            k.pos(0, 10),
        ]);

        // Pressing escape lets the player leave the game
        k.onKeyPress('escape', () => {
            k.go('lose', {
                title: 'Crawl Game',
                gameRestartSceneName: 'crawlGame',
                gameExitSceneName: 'arcade',
                score: timeLabel.text,
            });
        });

        // Create Crane
        const crane = k.add([
            k.rect(40, 20),
            k.pos(50, 150),
            k.area(),
            k.body(),
            {
                isMovingDown: false,
                isMovingUp: false,
                isMovingHorizontal: false,
                speed: 450,
                startPos: k.vec2(50, 150),
                grabbedItem: null,
            },
        ]);

        // Number of items
        const numItems = 6;

        // Create items for the crane to pick up
        for (let i = 0; i < numItems; i++) {
            k.add([
                k.rect(30, 30),
                // Calculate the position of each item, spacing them evenly
                k.pos(
                    (k.width() / (numItems + 1)) * (i + 1), // Spacing items evenly between width
                    k.height() - 200 // Y position (fixed 200 units from the bottom)
                ),
                k.area(),
                k.body({ isStatic: true }), // Ensure items don't move
                'item',
            ]);
        }

        // Default Controls
        // Crane movement left
        k.onButtonDown(['left'], () => {
            if (
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal &&
                crane.pos.x > 0
            ) {
                crane.move(-crane.speed, 0);
            }
        });

        // Crane movement right
        k.onButtonDown(['right'], () => {
            if (
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal &&
                crane.pos.x < width - 40
            ) {
                crane.move(crane.speed, 0);
            }
        });

        // Drop the crane using the spacebar
        k.onKeyPress(['space', 'down'], () => {
            if (
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal
            ) {
                crane.isMovingDown = true;
            }
        });

        // Extra buttons to allow mobile users to play
        // Add left button for mobile users
        const leftButtonTxt = k.make([
            k.text('<', { font: 'pixelFont' }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        const leftButton = k.add([
            k.rect(leftButtonTxt.width + 20, 40),
            k.pos(10, k.height() - 100),
            k.anchor('center'),
            k.area(),
            'leftButton',
            { isPressed: false },
        ]);

        leftButton.onUpdate(() => {
            if (
                leftButton.isPressed &&
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal &&
                crane.pos.x > 0
            ) {
                crane.move(-crane.speed, 0);
            }
        });

        leftButton.onClick(() => {
            leftButton.isPressed = true;
        });

        k.onMouseRelease(() => {
            leftButton.isPressed = false;
        });

        // Add right button for mobile users
        const rightButtonTxt = k.make([
            k.text('>', { font: 'pixelFont' }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        const rightButton = k.add([
            k.rect(rightButtonTxt.width + 20, 40),
            k.pos(k.width() - 10, k.height() - 100),
            k.anchor('center'),
            k.area(),
            'rightButton',
            { isPressed: false },
        ]);

        rightButton.onUpdate(() => {
            if (
                rightButton.isPressed &&
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal &&
                crane.pos.x < width - 40
            ) {
                crane.move(crane.speed, 0);
            }
        });

        rightButton.onClick(() => {
            rightButton.isPressed = true;
        });

        k.onMouseRelease(() => {
            rightButton.isPressed = false;
        });

        // Add drop button for mobile users
        const center = k.center();
        const dropButtonTxt = k.make([
            k.text('DROP', { font: 'pixelFont' }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        const dropButton = k.add([
            k.rect(dropButtonTxt.width + 20, 40),
            k.pos(center.x, k.height() - 100),
            k.anchor('center'),
            k.area(),
            'dropButton',
        ]);

        dropButton.onClick(() => {
            if (
                !crane.isMovingDown &&
                !crane.isMovingUp &&
                !crane.isMovingHorizontal
            ) {
                crane.isMovingDown = true;
            }
        });

        rightButton.add(rightButtonTxt);
        leftButton.add(leftButtonTxt);
        dropButton.add(dropButtonTxt);

        // Controls for players
        k.add([k.text('← → or to move the crane', { size: 32 }), k.pos(0, 40)]);
        k.add([k.text('↓ to drop crane', { size: 32 }), k.pos(0, 70)]);

        // Update the crane position during each frame
        k.onUpdate(() => {
            width = k.width();
            const deltaTime = k.dt() * 1000; // Get the time since last frame (in milliseconds)
            timeRemaining -= deltaTime;
            if (timeRemaining < 0) {
                timeRemaining = 0;
            }
            // Update the time label with the formatted remaining time
            timeLabel.text = formatTime(timeRemaining);

            const items = k.get('item');
            if (items.length === 0 || timeRemaining <= 0) {
                k.go('lose', {
                    title: 'Crawl game',
                    gameRestartSceneName: 'crawlGame',
                    gameExitSceneName: 'arcade',
                    score: timeLabel.text,
                });
            }
            if (crane.isMovingDown) {
                crane.move(0, crane.speed);
                // Check for collision with any items
                const item = k
                    .get('item')
                    .find((item) => crane.isColliding(item));
                if (item && !crane.grabbedItem) {
                    crane.grabbedItem = item; // Attach the item to the crane
                    k.debug.log('Item grabbed!');
                    timeRemaining += 10000;
                    // Reset crane position after reaching item
                    crane.isMovingDown = false; // Reset the flag so the crane can move again
                    crane.isMovingUp = true;
                }
                if (crane.pos.y > k.height() - 150) {
                    // Reset crane position after reaching bottom
                    timeRemaining -= 5000;
                    crane.isMovingDown = false; // Reset the flag so the crane can move again
                    crane.isMovingUp = true;
                }
            }
            // Move crane back up to its starting position
            if (crane.isMovingUp) {
                crane.move(0, -crane.speed);
                // Move the grabbed item with the crane
                if (crane.grabbedItem) {
                    crane.grabbedItem.pos.x = crane.pos.x; // Align item's x position with the crane
                    crane.grabbedItem.pos.y = crane.pos.y + 20; // Adjust y position (offset for the crane's size)
                }

                // Check if crane has reached its starting position
                if (crane.pos.y <= crane.startPos.y) {
                    crane.isMovingHorizontal = true;
                    crane.isMovingUp = false; // Stop moving up
                }
            }
            // Move crane horizontally back to the starting x position
            if (crane.isMovingHorizontal) {
                const moveDirection = crane.pos.x > crane.startPos.x ? -1 : 1; // Determine direction
                crane.move(moveDirection * crane.speed, 0);

                // Move the grabbed item with the crane horizontally
                if (crane.grabbedItem) {
                    crane.grabbedItem.pos.x = crane.pos.x; // Align item's x position with the crane
                }

                // Check if crane has reached its starting x position
                if (Math.abs(crane.pos.x - crane.startPos.x) <= 1) {
                    // Small tolerance for precision
                    crane.pos.x = crane.startPos.x; // Ensure exact x positioning
                    crane.isMovingHorizontal = false; // Stop movement

                    // Drop the grabbed item after reaching the start position
                    if (crane.grabbedItem) {
                        crane.grabbedItem.destroy();
                        crane.grabbedItem = null; // Release the item
                        k.debug.log('Item released!');
                    }
                }
            }
        });
    });
}

// Helper function to format time as MM:SS
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
