import { displayDialogue } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

export const interactionWithGameMachine13 = (player, k, map) => {
    player.onCollide('game_machine_13', () => {
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to play an Eat All Cake Game?', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting Eat All Cake Game... Good luck!'],
                        onDisplayEnd: () => {
                            startEatAllCakeGame(k); // Pass k to the game start function
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 13'
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

export function startEatAllCakeGame(k) {
    k.debug.log('Eat All Cake Game Started!');

    k.go('startScreen', {
        title: 'Eat All Cake Game',
        gameSceneName: 'eatAllCakeGame',
    });

    // Load sprites with frame slicing
    k.loadSprite('man', './assets/sprites/man.png', {
        sliceX: 3, // 3 frames per row horizontally
        sliceY: 4, // 4 rows, totaling 12 frames
    });

    k.loadSprite('desserts', './assets/sprites/desserts.png', {
        sliceX: 4, // 4 frames horizontally
        sliceY: 2, // 2 rows, total of 8 frames
    });

    // Main Game Scene
    k.scene('eatAllCakeGame', () => {
        const SPEED_MIN = 120;
        const SPEED_MAX = 640;
        let score = 0;
        const otherDessertsFrameIndex = [0, 2, 3, 4, 5, 6, 7];

        // Calculate scale based on screen size
        const scaleFactor = Math.min(k.width() / 800, k.height() / 600);

        // Add player character
        const player = k.add([
            k.sprite('man', { frame: 2, animSpeed: 0.1 }),
            k.pos(40, 20),
            k.scale(2.5 * scaleFactor),
            k.area(),
            k.anchor('center'),
            'player',
        ]);

        // Display score
        const scoreLabel = k.add([
            k.text(`Cake Eaten: ${score}`, 32 * scaleFactor),
            k.pos(12 * scaleFactor, 12 * scaleFactor),
        ]);

        // Update player position to follow mouse
        player.onUpdate(() => {
            const mousePosition = k.mousePos();
            player.pos.x = Math.min(mousePosition.x, k.width() - player.width);
            player.pos.y = Math.min(
                mousePosition.y,
                k.height() - player.height
            );
        });

        // Loop to spawn desserts and cakes
        k.loop(0.9, () => {
            const x = k.width() + 24;
            const y = k.rand(0, k.height());
            const speed = k.rand(SPEED_MIN, SPEED_MAX);
            const isCake = k.chance(0.5); // 60% chance for cake

            const frameIndex = isCake ? 1 : k.choose(otherDessertsFrameIndex); // Frame 1 is "cake", others are "desserts"

            k.add([
                k.sprite('desserts', { frame: frameIndex }),
                k.pos(x, y),
                k.scale(0.25 * scaleFactor), // Adjusted scale for better visibility
                k.area(), // Ensure collision detection works
                k.anchor('center'),
                isCake ? 'cake' : 'dessert', // Assign tag for collision
                { speed: speed },
            ]);
        });

        // When player collides with cake, increase score and destroy the cake
        k.onCollide('player', 'cake', (player, cake) => {
            score += 1;
            k.destroy(cake); // Remove cake once eaten
            scoreLabel.text = `Cake Eaten: ${score}`;
        });

        // When player collides with dessert, end game
        k.onCollide('player', 'dessert', (player, dessert) => {
            k.go('lose', {
                title: 'Eat All Cake Game',
                gameRestartSceneName: 'eatAllCakeGame',
                gameExitSceneName: 'arcade',
                score,
            }); // Go to lose scene
            score = 0;
        });

        // Move desserts and cakes, destroy them if off-screen
        k.onUpdate('dessert', (dessert) => {
            dessert.move(-dessert.speed, 0);
            if (dessert.pos.x < -120) {
                k.destroy(dessert);
            }
        });

        k.onUpdate('cake', (cake) => {
            cake.move(-cake.speed, 0);
            if (cake.pos.x < -120) {
                k.destroy(cake);
            }
        });
    });
}
