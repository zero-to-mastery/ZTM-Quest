import { displayDialogue } from '../../utils';

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
                        text: [
                            'Starting the Jumper Game... Get ready!!',
                        ],
                        onDisplayEnd: () => {
                            startJumpQuest(k)
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

    const OBSTACLE_SPEED_START = 100;
    const JUMP_FORCE = 1000;
    const GRAVITY = 1600;
    const SPAWN_DELAY_MIN = 3;
    const SPAWN_DELAY_MAX = 7;

    k.go('startScreen', {
        title: 'Jump Quest',
        gameSceneName: 'jumpQuest',
    });

    k.scene('jumpQuest', () => {
        let score = 0;

        let obstacleSpeed = OBSTACLE_SPEED_START;


        k.setGravity(GRAVITY);

        const player = k.add([
            k.rect(30, 30),
            k.pos(80, k.height() - 30),
            k.color(0, 0, 255),
            k.area(),
            k.body(),
        ]);


        const floor = k.add([
            k.rect(2000, 10),
            k.area(),
            k.pos(0, k.height()),
            k.anchor('botleft'),
            k.body({ isStatic: true }),
        ]);

        const scoreLabel = k.add([
            k.text(score),
            k.pos(24, 24),
            k.layer('ui'),
            {
                value: score,
            },
        ]);

        function increaseScore() {
            score+=3;
            scoreLabel.text = score;
        }

        function increaseSpeed() {
            obstacleSpeed++;
        }

        spawnObstacle();

        function spawnObstacle() {
            const spawnDelay = k.rand(SPAWN_DELAY_MIN, SPAWN_DELAY_MAX);
            k.wait(spawnDelay, () => {
                k.add([
                    k.rect(20, 40),
                    k.pos(k.width(), k.height() - 40 - floor.height),
                    k.color(255, 0, 0),
                    k.area(),
                    k.body(),
                    k.move(k.LEFT, obstacleSpeed),
                    k.offscreen({destroy: true}),
                    "obstacle",
                    {speed: 200},
                ]);

                spawnObstacle();
            });
        }

        k.loop(0.2, () =>{
            increaseScore();
            increaseSpeed();
        });

        k.onKeyPress("space", () => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        player.onCollide('obstacle', () => {
            k.go('lose', {
                title: 'Jump Quest',
                gameRestartSceneName: 'jumpQuest',
                gameExitSceneName: 'arcade',
                score,
            });
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