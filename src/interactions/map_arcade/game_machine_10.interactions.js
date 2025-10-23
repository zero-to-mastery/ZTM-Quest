import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

let abort;

export const interactionWithGameMachine10 = (player, k, map) => {
    player.onCollide('game_machine_10', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Do you want to play "Catch the Moon"? Join the adventure and see how many moons you can catch before time runs out!',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Get ready for "Catch the Moon"! Aim to gather as many moons as possible. Good luck!',
                        ],
                        onDisplayEnd: () => {
                            startCatchTheMoon(k);
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 10'
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
            },
            player,
            k,
            abort
        );
    });
};

function startCatchTheMoon(k) {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    let collectedMoons = 0;
    let moonCount = 1;
    let tkeyCount = 10;
    let timerDuration = 5000;
    let timer;
    let score = 0;
    const moonPositions = [];

    k.go('startScreen', {
        title: 'Catch the moon',
        gameSceneName: 'catchTheMoon',
    });

    k.scene('catchTheMoon', () => {
        k.loadSprite('moon', './assets/sprites/moon.png');
        k.loadSprite('tkey', './assets/sprites/TKey.png');

        // Function to reset the level
        function resetLevel() {
            // Clear all moons
            k.destroyAll('moon');
            moonPositions.length = 0;

            // Increment moon count for the next level
            moonCount++;
            addMoons();

            // Reset timer duration and score display
            timerDuration = Math.max(100, timerDuration - 50);
            updateTimer();
        }

        // Function to check if a position is occupied by a sprite
        function isPositionOccupied(x, y) {
            return moonPositions.some((pos) => {
                return Math.abs(pos.x - x) < 30 && Math.abs(pos.y - y) < 30; // Adjust the threshold as needed
            });
        }

        // Function to add sprite
        function addMoons() {
            for (let i = 0; i < moonCount; i++) {
                let moon;

                do {
                    const x = k.rand(50, WIDTH - 50);
                    const y = k.rand(50, HEIGHT - 50);

                    if (!isPositionOccupied(x, y)) {
                        moon = k.add([
                            k.sprite('moon'),
                            k.pos(x, y),
                            k.scale(1),
                            k.area(),
                            'moon',
                        ]);
                        moonPositions.push({ x, y });
                    }
                } while (!moon);

                moon.onClick(() => {
                    k.destroy(moon);
                    collectedMoons++;
                    score++;
                    tkeyCount += 2;

                    if (collectedMoons === moonCount) {
                        collectedMoons = 0;
                        resetLevel();
                    }
                });
            }

            for (let i = 0; i < tkeyCount; i++) {
                let tkey;
                do {
                    const x = k.rand(50, WIDTH - 50);
                    const y = k.rand(50, HEIGHT - 50);

                    if (!isPositionOccupied(x, y)) {
                        tkey = k.add([
                            k.sprite('tkey'),
                            k.pos(x, y),
                            k.scale(1),
                            'tkey',
                        ]);
                    }
                } while (!tkey);
            }
        }

        function updateTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                k.go('lose', {
                    title: 'Catch the moon',
                    gameRestartSceneName: 'catchTheMoon',
                    gameExitSceneName: 'arcade',
                    score,
                });
            }, timerDuration);
        }

        addMoons();
        updateTimer();

        k.onKeyPress('escape', () => {
            k.go('lose', {
                title: 'Catch the moon',
                gameRestartSceneName: 'catchTheMoon',
                gameExitSceneName: 'arcade',
                score,
            });
            clearTimeout(timer);
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        });

        const scoreLabel = k.add([k.text(`Score: ${score}`), k.pos(20, 20)]);

        k.onUpdate(() => {
            scoreLabel.text = `Score: ${score}`;
        });
    });
}
