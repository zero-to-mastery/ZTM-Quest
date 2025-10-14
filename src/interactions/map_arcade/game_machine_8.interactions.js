import { scaleFactor } from '../../constants';
// Arcade machine interaction
import { displayDialogue } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

export const interactionWithGameMachine8 = (player, k) => {
    // Check collision with the game machine
    player.onCollide('game_machine_8', () => {
        showCustomPrompt(
            'Do you want to play ROBO RUNNER 🏃‍➡️?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Mini-Game started!'],
                        onDisplayEnd: () => {
                            initGame(k);
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 8'
                            );
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

export function initGame(k) {
    k.debug.log('Mini-Game started!');

    const FLOOR_HEIGHT = 48;
    const JUMP_FORCE = 800;
    const SPEED = 480;
    const GRAVITY = 2400;

    k.go('startScreen', { title: 'Robo runner', gameSceneName: 'roboRunner' });

    k.scene('roboRunner', () => {
        // Set gravity
        k.setGravity(GRAVITY);

        // Set background color
        k.setBackground(141, 183, 255);

        k.loadSprite('runner', './assets/sprites/characters.png', {
            sliceX: 10,
            sliceY: 20,
            anims: {
                run: { from: 118, to: 119, loop: true, speed: 4 }, // Running animation
            },
        });

        const player = k.add([
            k.sprite('runner', { anim: 'run' }),
            k.pos(80, 40),
            k.area(),
            k.body(),
            k.scale(scaleFactor),
        ]);

        // Player jump logic
        k.onKeyPress('space', () => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        k.onClick(() => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        k.add([
            k.rect(k.width(), FLOOR_HEIGHT),
            k.pos(0, k.height()),
            k.anchor('botleft'),
            k.outline(4),
            k.area(),
            k.body({ isStatic: true }),
            k.color(132, 101, 236),
        ]);

        // Function to spawn trees
        function spawnTree() {
            k.add([
                k.rect(48, k.rand(32, 96)),
                k.area(),
                k.outline(4),
                k.pos(k.width(), k.height() - FLOOR_HEIGHT),
                k.anchor('botleft'),
                k.color(238, 143, 203),
                k.move(k.LEFT, SPEED),
                'tree',
            ]);

            k.wait(k.rand(1.5, 3), () => {
                spawnTree();
            });
        }

        spawnTree();

        // Handle collision and game over logic
        let score = 0;
        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);

        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
        });

        player.onCollide('tree', () => {
            k.addKaboom(player.pos);
            k.shake();
            k.go('lose', {
                title: 'Robo Runner',
                gameRestartSceneName: 'roboRunner',
                gameExitSceneName: 'arcade',
                score,
            });
        });
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
}
