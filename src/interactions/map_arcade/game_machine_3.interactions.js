import { displayDialogue } from '../../utils';
import { addCoins } from '../../utils/coinsUpdate';

export const interactionWithGameMachine3 = (player, k, map) => {
    player.onCollide('game_machine_3', () => {
        player.isInDialog = true;
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to play the Flappy bird game?', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Flappy Bird Game... Good luck!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startFlappyBirdGame(k); // Pass k to the game start function
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

function startFlappyBirdGame(k) {
    k.debug.log('Flappy Bird Game started!');

    const GRAVITY = 1200;
    const FLAP_STRENGTH = 520;
    const BIRD_SCALE = 2; // Adjust this as needed
    const PIPE_GAP = 230;
    const PIPE_SCALE = 2;
    const PIPE_SPEED = 240;
    const MIN_PIPE_HEIGHT = 100;

    let score = 0;

    k.go('startScreen', {
        title: 'Flappy Bird',
        gameSceneName: 'flappyBirdGame',
    });

    k.scene('flappyBirdGame', () => {
        k.setGravity(GRAVITY);

        // Load individual bird images for different flaps
        k.loadSprite('bird-up', './assets/sprites/bluebird-upflap.png');
        k.loadSprite('bird-mid', './assets/sprites/bluebird-midflap.png');
        k.loadSprite('bird-down', './assets/sprites/bluebird-downflap.png');

        k.loadSprite('pipe', './assets/sprites/pipe-green.png');
        k.loadSprite('bg', './assets/sprites/background-day.png');
        k.loadSprite('countdown-3', './assets/sprites/3.png');
        k.loadSprite('countdown-2', './assets/sprites/2.png');
        k.loadSprite('countdown-1', './assets/sprites/1.png');

        k.add([
            k.sprite('bg', { width: k.width(), height: k.height() }),
            k.pos(0, 0),
            k.fixed(),
        ]);

        // Create a bird sprite and set its initial position
        const bird = k.add([
            k.sprite('bird-up'), // Start with the up flap image
            k.pos(80, k.height() / 2),
            k.area({ width: 34 * BIRD_SCALE, height: 24 * BIRD_SCALE }), // Adjust to match the bird's dimensions
            k.body(),
            k.scale(BIRD_SCALE),
            'bird',
        ]);

        // Set initial animation frame
        let animationFrame = 0;
        const animationInterval = 0.1; // Time between frames (adjust as needed)

        // Make the bird static initially
        bird.paused = true;

        const countdown = k.add([
            k.sprite('countdown-3'),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
        ]);

        function startCountdown() {
            let count = 3;
            const countdownInterval = setInterval(() => {
                count--;

                if (count === 2) {
                    countdown.use(k.sprite('countdown-2'));
                } else if (count === 1) {
                    countdown.use(k.sprite('countdown-1'));
                } else if (count === 0) {
                    countdown.destroy();
                    clearInterval(countdownInterval);
                    bird.paused = false; // Release the bird
                    startGame();
                }
            }, 1000);
        }

        startCountdown();

        function startGame() {
            k.onKeyPress('space', () => {
                bird.jump(FLAP_STRENGTH);
            });

            k.onClick(() => {
                bird.jump(FLAP_STRENGTH);
            });

            function spawnPipes() {
                const pipeGapTop = k.rand(
                    MIN_PIPE_HEIGHT,
                    k.height() - PIPE_GAP - MIN_PIPE_HEIGHT
                );

                // Spawn top pipe
                k.add([
                    k.sprite('pipe', { flipY: true }),
                    k.area(),
                    k.pos(k.width(), pipeGapTop),
                    k.anchor('botleft'),
                    k.scale(PIPE_SCALE),
                    k.body({ isStatic: true }),
                    k.move(k.LEFT, PIPE_SPEED),
                    k.offscreen({ destroy: true }),
                    'pipe',
                ]);

                // Spawn bottom pipe
                k.add([
                    k.sprite('pipe'),
                    k.area(),
                    k.pos(k.width(), pipeGapTop + PIPE_GAP),
                    k.anchor('topleft'),
                    k.scale(PIPE_SCALE),
                    k.body({ isStatic: true }),
                    k.move(k.LEFT, PIPE_SPEED),
                    k.offscreen({ destroy: true }),
                    'pipe',
                ]);

                k.wait(1.5, spawnPipes);
            }

            spawnPipes();

            bird.onCollide('pipe', () => {
                endGame();
            });

            bird.onCollide('ceiling', () => {
                endGame();
            });

            const scoreLabel = k.add([k.text(score), k.pos(24, 24), k.fixed()]);

            k.onUpdate(() => {
                score++;
                scoreLabel.text = score;

                // Update bird animation based on time
                animationFrame += k.dt() / animationInterval; // Increment frame counter
                if (animationFrame >= 3) animationFrame = 0; // Reset if it exceeds number of frames
                if (animationFrame < 1) {
                    bird.use(k.sprite('bird-up'));
                } else if (animationFrame < 2) {
                    bird.use(k.sprite('bird-mid'));
                } else {
                    bird.use(k.sprite('bird-down'));
                }

                if (bird.pos.y > k.height()) {
                    endGame();
                }
            });

            k.onResize(() => {
                bird.pos = k.vec2(80, k.height() / 2);
            });
        }

        function endGame() {
            k.addKaboom(bird.pos);
            k.shake();
            if (score > 1500) {
                addCoins(10);
            }
            k.go('lose', {
                title: 'Flappy Bird',
                gameRestartSceneName: 'flappyBirdGame',
                gameExitSceneName: 'arcade',
                score,
            });
            score = 0;
        }
    });
}
