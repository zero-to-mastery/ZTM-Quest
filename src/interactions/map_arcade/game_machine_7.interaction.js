import { displayDialogue } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

export const interactionWithGameMachine7 = (player, k, map) => {
    player.onCollide('game_machine_7', () => {
        showCustomPrompt(
            'Do you want to play the Jumper Game?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Jumper Game... Get ready!!'],
                        onDisplayEnd: () => {
                            startJumpQuest(k);
                            updateAchievements("Arcade gamer", "Game machine 7");
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
    document.getElementById('prompt-message').textContent = message;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');

        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };

        optionsContainer.appendChild(button);
    });

    document.getElementById('custom-prompt').style.display = 'flex';

    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

function closeCustomPrompt() {
    document.getElementById('custom-prompt').style.display = 'none';
}

function startJumpQuest(k) {
    k.debug.log('Game Jump Quest started!');

    const OBSTACLE_SPEED_START = 300;
    const JUMP_FORCE = 1000;
    const GRAVITY = 1000;
    const SPAWN_DELAY_MIN = 2;
    const SPAWN_DELAY_MAX = 5;
    const IMMUNITY_DURATION = 10;

    k.go('startScreen', {
        title: 'Jump Quest',
        gameSceneName: 'jumpQuest',
    });

    k.scene('jumpQuest', () => {
        k.loadSprite(
            'backgroundCity',
            './assets/sprites/runner-quest-background.png'
        );
        k.loadSprite('barrier', './assets/sprites/runner-quest-barrier.png');

        k.loadSprite('runner', './assets/sprites/runner-quest-player.png', {
            sliceX: 10,
            sliceY: 1,
            anims: {
                run: { from: 0, to: 9, loop: true, speed: 10 },
            },
        });

        k.add([
            k.sprite('backgroundCity', {
                width: k.width(),
                height: k.height(),
            }),
            k.pos(0, 0),
            k.fixed(),
        ]);

        let score = 0;
        let obstacleSpeed = OBSTACLE_SPEED_START;
        let isImmune = false;

        k.setGravity(GRAVITY);

        const floor = k.add([
            k.rect(k.width(), 40),
            k.area(),
            k.opacity(0),
            k.pos(0, k.height()),
            k.anchor('botleft'),
            k.body({ isStatic: true }),
        ]);

        const player = k.add([
            k.sprite('runner', { anim: 'run' }),
            k.pos(20, k.height() / 2),
            k.area(),
            k.body(),
            k.opacity(1),
            k.scale(2),
        ]);

        const scoreLabel = k.add([
            k.text(score),
            k.pos(24, 24),
            k.layer('ui'),
            {
                value: score,
            },
        ]);

        function increaseScore(scoreIncrement) {
            score += scoreIncrement;
            scoreLabel.text = score;
        }

        function increaseSpeed() {
            obstacleSpeed++;
        }

        function grantImmunity() {
            isImmune = true;
            player.opacity = 0.5; // Change color to show immunity

            k.wait(IMMUNITY_DURATION, () => {
                isImmune = false;
                player.opacity = 1; // Revert color after immunity ends
            });
        }

        spawnObstacle();

        function spawnObstacle() {
            k.wait(
                k.rand(
                    SPAWN_DELAY_MIN,
                    SPAWN_DELAY_MAX - obstacleSpeed / OBSTACLE_SPEED_START
                ),
                () => {
                    if (Math.random() < 0.2) {
                        k.add([
                            k.rect(30, 30),
                            k.pos(
                                k.width(),
                                k.rand(k.height() * 0.4, k.height() * 0.8)
                            ),
                            k.color(255, 255, 0),
                            k.outline(5),
                            k.area(),
                            k.move(k.LEFT, obstacleSpeed),
                            k.offscreen({ destroy: true }),
                            'immunityToken',
                        ]);
                    } else {
                        k.add([
                            k.sprite('barrier', { width: 120, height: 120 }),
                            k.pos(k.width(), k.height() - 120 - floor.height),
                            k.area(),
                            k.body(),
                            k.move(k.LEFT, obstacleSpeed),
                            k.offscreen({ destroy: true }),
                            'obstacle',
                            { speed: 200 },
                        ]);
                    }

                    spawnObstacle();
                }
            );
        }

        k.loop(0.4, () => {
            increaseScore(3);
            increaseSpeed();
        });

        k.onKeyPress('space', () => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        player.onCollide('obstacle', (obj) => {
            if (isImmune) {
                increaseScore(20);
                k.destroy(obj);
            } else {
                k.go('lose', {
                    title: 'Jump Quest',
                    gameRestartSceneName: 'jumpQuest',
                    gameExitSceneName: 'arcade',
                    score,
                });
            }
        });

        player.onCollide('immunityToken', (token) => {
            grantImmunity();
            increaseScore(100);
            k.destroy(token);
        });

        k.onKeyPress('escape', () => {
            k.go('lose', {
                title: 'Jump Quest',
                gameRestartSceneName: 'jumpQuest',
                gameExitSceneName: 'arcade',
                score,
            });
        });
    });
}
