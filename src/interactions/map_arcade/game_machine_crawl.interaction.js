import { displayDialogue } from '../../utils';

export const interactionWithGameMachineCrawl = (player, k, map) => {
    player.onCollide('game_machine_crawl', () => {
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
                            startCrawlGame(k); // Pass k to the game start function
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
function startCrawlGame(k) {
    k.debug.log('Crawl game Started!');
    k.go('startScreen', { title: 'Crawl Game', gameSceneName: 'crawlGame' });

    let score = 60000
    k.scene("crawlGame", () => {
        // Pressing escape lets the player leave the game
        k.onKeyPress('escape', () => {
            k.go('lose', {
                title: 'Crawl Game',
                gameRestartSceneName: 'crawlGame',
                gameExitSceneName: 'arcade',
                score
            });
        });

        // Create Crane
        const crane = k.add([
            k.rect(40, 20),
            k.pos(50, 50),
            k.area(),
            k.body(),
            { isMovingDown: false, isMovingUp: false, isMovingHorizontal: false, speed: 300, startPos: k.vec2(50, 50), grabbedItem: null }
        ]);

        // Number of items
        const numItems = 5;

        // Create items for the crane to pick up
        for (let i = 0; i < numItems; i++) {
            k.add([
                k.rect(30, 30),
                // Calculate the position of each item, spacing them evenly
                k.pos(
                    (k.width() / (numItems + 1)) * (i + 1), // Spacing items evenly between width
                    k.height() - 200                        // Y position (fixed 200 units from the bottom)
                ),
                k.area(),
                k.body({ isStatic: true }),  // Ensure items don't move
                "item",
            ]);
        }

        // Crane movement left
        k.onButtonDown(["left"], () => {
            if (!crane.isMovingDown && !crane.isMovingUp && !crane.isMovingHorizontal) {
                crane.move(-crane.speed, 0);
            }
        });

        // Crane movement right
        k.onButtonDown(["right"], () => {
            if (!crane.isMovingDown && !crane.isMovingUp && !crane.isMovingHorizontal) {
                crane.move(crane.speed, 0);
            }
        });

        // Drop the crane using the spacebar
        k.onKeyPress("space", () => {
            if (!crane.isMovingDown && !crane.isMovingUp && !crane.isMovingHorizontal) {
                crane.isMovingDown = true;
            }
        });

        // keep track of score
        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);

        // Update the crane position during each frame
        k.onUpdate(() => {
            score--
            scoreLabel.text = score;
            if (crane.isMovingDown) {
                crane.move(0, crane.speed);
                // Check for collision with any items
                const item = k.get("item").find(item => crane.isColliding(item));
                if (item && !crane.grabbedItem) {
                    crane.grabbedItem = item;  // Attach the item to the crane
                    k.debug.log("Item grabbed!");
                    score+= 10000
                    // Reset crane position after reaching item
                    crane.isMovingDown = false;  // Reset the flag so the crane can move again
                    crane.isMovingUp = true;
                }
                if (crane.pos.y > k.height()) {
                    // Reset crane position after reaching bottom
                    score-= 5000
                    crane.isMovingDown = false;  // Reset the flag so the crane can move again
                    crane.isMovingUp = true;
                }
            }
            // Move crane back up to its starting position
            if (crane.isMovingUp) {
                crane.move(0, -crane.speed);
                // Move the grabbed item with the crane
                if (crane.grabbedItem) {
                    crane.grabbedItem.pos.x = crane.pos.x;  // Align item's x position with the crane
                    crane.grabbedItem.pos.y = crane.pos.y + 20;  // Adjust y position (offset for the crane's size)
                }

                // Check if crane has reached its starting position
                if (crane.pos.y <= crane.startPos.y) {
                    crane.isMovingHorizontal = true
                    crane.isMovingUp = false;    // Stop moving up
                }
            }
            // Move crane horizontally back to the starting x position
            if (crane.isMovingHorizontal) {
                const moveDirection = crane.pos.x > crane.startPos.x ? -1 : 1;  // Determine direction
                crane.move(moveDirection * crane.speed, 0);

                // Move the grabbed item with the crane horizontally
                if (crane.grabbedItem) {
                    crane.grabbedItem.pos.x = crane.pos.x;  // Align item's x position with the crane
                }

                // Check if crane has reached its starting x position
                if (Math.abs(crane.pos.x - crane.startPos.x) <= 1) {  // Small tolerance for precision
                    crane.pos.x = crane.startPos.x;  // Ensure exact x positioning
                    crane.isMovingHorizontal = false;  // Stop movement

                    // Drop the grabbed item after reaching the start position
                    if (crane.grabbedItem) {
                        crane.grabbedItem.destroy()
                        crane.grabbedItem = null;  // Release the item
                        k.debug.log("Item released!");
                    }
                }
            }
        });
    });
}
