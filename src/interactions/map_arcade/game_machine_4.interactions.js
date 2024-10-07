import { displayDialogue } from '../../utils';

export const interactionWithGameMachine4 = (player, k, map) => {
    player.onCollide('game_machine_4', () => {
        player.isInDialog = true;
        showCustomPrompt(
            'Think you can guide the bird through the pipes? Jump in and play Flappy Bird!',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Launching Flappy Bird... Time to spread your wings! Good luck!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startBirdGame(k);
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

function startBirdGame(k) {
    k.debug.log('Bird Game initialized');

    const JUMP_FORCE = 400;
    const PIPE_SPEED = 250;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 300;  
    const GRAVITY = 1600;

    k.loadSprite('bird', './assets/sprites/bird.png', {
        sliceX: 1,
    });

    k.loadSprite('pipe', './assets/sprites/pipe.png');

    k.loadSound('button-click-sound', './assets/sprites/jump.wav');
    k.loadSound('game-over-sound', './assets/sprites/game_over.wav');


    k.scene('startScreen', () => {
        k.add([
            k.text('Bird Game', { size: 48 }),
            k.pos(k.width() / 2, k.height() / 3),
            k.anchor('center'),
        ]);

        const startButton = k.add([
            k.rect(200, 60),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
            k.color(0, 255, 0),
            'button',
        ]);

        startButton.add([
            k.text('Start Game', { size: 24 }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        k.onMousePress(() => {
            if (k.mousePos().x > startButton.pos.x - 100 &&
                k.mousePos().x < startButton.pos.x + 100 &&
                k.mousePos().y > startButton.pos.y - 30 &&
                k.mousePos().y < startButton.pos.y + 30) {
                k.go('birdGame');
            }
        });

        k.onKeyPress('space', () => {
            k.go('birdGame');
        });
    });

    k.scene('birdGame', () => {
        k.setGravity(GRAVITY);

        const bird = k.add([
            k.sprite('bird'),
            k.pos(80, k.height() / 2),
            k.anchor('center'),
            k.area(),  
            k.body(),
            k.scale(0.2),  
            'bird',
        ]);

        k.onKeyPress('space', () => {
            k.play('button-click-sound');
            bird.jump(JUMP_FORCE);
        });

        function spawnPipe() {
            const pipeY = k.rand(PIPE_GAP, k.height() - PIPE_GAP);
            const topPipe = k.add([
                k.sprite('pipe'),
                k.pos(k.width(), pipeY - PIPE_GAP / 2),
                k.anchor('botleft'),
                k.area(),
                k.move(k.LEFT, PIPE_SPEED),
                k.scale(0.5),
                'pipe',
            ]);

            const bottomPipe = k.add([
                k.sprite('pipe'),
                k.pos(k.width(), pipeY + PIPE_GAP / 2),
                k.anchor('topleft'),
                k.area(),
                k.move(k.LEFT, PIPE_SPEED),
                k.scale(0.5),
                'pipe',
            ]);

            topPipe.onUpdate(() => {
                if (topPipe.pos.x < -PIPE_WIDTH) {
                    k.destroy(topPipe);
                    k.destroy(bottomPipe);
                }
            });

            k.wait(3, spawnPipe); 
        }

        k.wait(1, spawnPipe);

        bird.onCollide('pipe', () => {
            k.play('game-over-sound');
            k.go('lose', score);
        });

        k.onUpdate(() => {
            if (bird.pos.y > k.height() || bird.pos.y < 0) {
                k.go('lose', score);
            }
        });

        let score = 0;
        const scoreLabel = k.add([k.text(score), k.pos(24, 24)]);

        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
        });
    });

    k.scene('lose', (score) => {
        k.play('game-over-sound');
        k.add([k.text('Game Over'), k.pos(k.center()), k.anchor('center')]);
        k.add([
            k.text(`Score: ${score}`),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.scale(2),
            k.anchor('center'),
        ]);

        const restartButton = k.add([
            k.rect(200, 60),
            k.pos(k.width() / 2, k.height() / 2 + 160),
            k.anchor('center'),
            k.color(0, 255, 0),
            'button',
        ]);

        restartButton.add([
            k.text('Restart', { size: 24 }),
            k.anchor('center'),
            k.color(0, 0, 0),
        ]);

        k.onMousePress(() => {
            if (k.mousePos().x > restartButton.pos.x - 100 &&
                k.mousePos().x < restartButton.pos.x + 100 &&
                k.mousePos().y > restartButton.pos.y - 30 &&
                k.mousePos().y < restartButton.pos.y + 30) {
                k.go('startScreen');
            }
        });

        k.onKeyPress('space', () => {
            k.go('startScreen');
        });
    });

    k.go('startScreen');
}
