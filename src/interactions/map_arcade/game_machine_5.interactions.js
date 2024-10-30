import { displayDialogue } from '../../utils';

export const interactionWithGameMachine5 = (player, k, map) => {
    player.onCollide('game_machine_5', () => {
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to break some bricks?', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Break Brick Game... Good luck!'],
                        onDisplayEnd: () => {
                            startBreakBrickGame(k); // Pass k to the game start function
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
export function startBreakBrickGame(k) {
    k.debug.log('Break Brick Game Started!');

    const scaleFactor = 0.7;
    let score = 0;
    const constantSpeed = 480;
    let lives = 4;
    let totalBricks = 0;
    let bricks = [];

    k.go('startScreen', {
        title: 'Break Brick Game',
        gameSceneName: 'breakBrickGame',
    });

    k.scene('breakBrickGame', () => {
        // Load and add paddle
        k.loadSprite('paddle', './assets/sprites/paddleRed.png');
        const paddle = k.add([
            k.sprite('paddle'),
            k.pos(k.width() / 2, k.height() * 0.7),
            k.area(),
            k.anchor('center'),
            k.scale(1.1),
            'paddle',
        ]);

        function updatePaddleSize() {
            const paddleWidth = k.width() * 0.1;
            paddle.width = paddleWidth;
            paddle.pos.x = Math.min(paddle.pos.x, k.width() - paddleWidth / 2);
        }

        // Paddle movement
        k.onUpdate(() => {
            paddle.pos.x = Math.max(
                paddle.width / 2,
                Math.min(k.mousePos().x, k.width() - paddle.width / 2)
            );
        });

        // Load and add ball
        k.loadSprite('ballGrey', './assets/sprites/ballGrey.png');
        const ball = k.add([
            k.sprite('ballGrey'),
            k.pos(k.width() / 2, k.height() * 0.6),
            k.area(),
            k.scale(scaleFactor),
            { vel: k.vec2(20, -20).unit().scale(constantSpeed) },
        ]);

        // Ball and paddle collision handling
        ball.onCollide('paddle', (p) => {
            // Calculate offset as a fraction of the paddle width
            const offset = (ball.pos.x - paddle.pos.x) / (paddle.width / 2);

            ball.vel.x = offset * constantSpeed; // Horizontal speed varies based on offset
            ball.vel.y = -Math.abs(constantSpeed); // Fixed upward speed const offset = ball.pos.x - paddle.pos.x;
        });

        function resetBall() {
            ball.pos = k.vec2(k.width() / 2, k.height() * 0.6);
            ball.vel = k.vec2(1, -1).unit().scale(constantSpeed);
        }

        // Load and setup bricks
        const brickColors = ['red', 'yellow', 'green', 'blue'];
        brickColors.forEach((color) =>
            k.loadSprite(
                color,
                `./assets/sprites/element_${color}_rectangle_glossy.png`
            )
        );

        function setupBricks() {
            bricks.forEach((brick) => k.destroy(brick));
            bricks = [];

            const sideMargin =
                k.width() < 800 ? k.width() * 0.07 : k.width() * 0.05;
            const availableWidth = k.width() - 2 * sideMargin;
            const brickWidth =
                k.width() < 800
                    ? availableWidth / 6
                    : Math.min(availableWidth / 10, 100);
            const brickHeight = brickWidth * 0.6;
            const numBricksPerRow = Math.floor(
                availableWidth / (brickWidth * 1.1)
            );
            const numRows = 4;
            const horizontalOffset =
                sideMargin +
                (availableWidth - numBricksPerRow * brickWidth * 1.1) / 2;

            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numBricksPerRow; col++) {
                    const x = horizontalOffset + col * brickWidth * 1.1;
                    const y = row * brickHeight * 1.2 + 100;
                    const brick = k.add([
                        k.sprite(brickColors[row % brickColors.length]),
                        k.pos(x, y),
                        k.scale(brickWidth / 100),
                        k.area(),
                        'brick',
                    ]);
                    bricks.push(brick);
                }
            }
            totalBricks = bricks.length;
        }

        setupBricks();

        // Score and Lives display setup
        const scoreText = k.add([
            k.text(`Score: ${score}`, { size: 35 }),
            k.pos(k.width() / 2, 10),
            {
                update() {
                    this.text = `Score: ${score}`;
                },
            },
        ]);

        const livesText = k.add([
            k.text(`Lives: ${lives}`, { size: 35 }),
            k.pos(k.width() / 2, 50),
            {
                update() {
                    this.text = `Lives: ${lives}`;
                },
            },
        ]);

        // Ball and brick collision handling
        ball.onCollide('brick', (brick) => {
            k.destroy(brick);
            bricks = bricks.filter((b) => b !== brick);
            score += 1;

            // Bounce vertically after hitting a brick
            ball.vel.y = -ball.vel.y;

            if (score >= totalBricks) {
                k.wait(0.1, () => {
                    k.go('win');
                });
            }
        });

        // Ball movement and boundary checks
        ball.onUpdate(() => {
            ball.vel = ball.vel.unit().scale(constantSpeed);
            ball.move(ball.vel);

            if (ball.pos.x < 0 || ball.pos.x > k.width())
                ball.vel.x = -ball.vel.x;
            if (ball.pos.y < 0) ball.vel.y = -ball.vel.y;

            if (ball.pos.y > k.height()) {
                if (lives > 0) {
                    resetBall();
                    lives -= 1;
                } else {
                    k.go('lose', {
                        title: 'Break Brick Game',
                        gameRestartSceneName: 'breakBrickGame',
                        gameExitSceneName: 'arcade',
                        score,
                    });
                    score = 0;
                    lives = 4;
                }
            }
        });

        // Debounced resize handler to avoid excessive calls
        function debounceResize(fn, delay) {
            let timer;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, arguments), delay);
            };
        }

        // Responsive resizing
        function resizeGameElements() {
            setupBricks();
            resetBall();
            scoreText.pos.x = k.width() / 2;
            livesText.pos.x = k.width() / 2;
            updatePaddleSize();
        }

        window.addEventListener(
            'resize',
            debounceResize(resizeGameElements, 300)
        );

        k.scene('win', () => {
            k.add([
                k.text(`Congratulations! You Won!\nScore: ${score}`),
                k.pos(k.width() / 2, k.height() / 2),
                k.anchor('center'),
            ]);

            k.add([
                k.text('Press Space to Play Again', { size: 24 }),
                k.pos(k.width() / 2, k.height() / 2 + 60),
                k.anchor('center'),
            ]);

            // Restart game on pressing Enter
            k.onKeyPress('space', () => {
                k.go('breakBrickGame');
            });
            score = 0;
            lives = 4;
        });
    });
}
