import { time } from '../../kplayCtx';
import { displayDialogue, hideCanvasFrame, showCanvasFrame, showCustomPrompt } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

let abort;

export const interactionWithGameMachine11 = (player, k, map) => {
    player.onCollide('game_machine_11', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Do you want to play the Sinusoid Formula Game? Collect trophies and overtake formulas!',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Starting the Sinusoid Formula Game... Fasten your belts!',
                        ],
                        onDisplayEnd: () => {
                            startChromeFormulaGame(k);
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 11'
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

function startChromeFormulaGame(k) {
    const roadHeight = k.height() / 3;
    const roadPosition = k.height() / 3;
    const scaleFactor = (k.width() / k.height()) * 2;
    const formulaCenter = k.height() / 2 - 12 * scaleFactor;
    const formulaUp = roadPosition + roadHeight / 3 / 2 - 12 * scaleFactor;
    const formulaDown =
        2 * roadPosition - roadHeight / 3 / 2 - 12 * scaleFactor;
    const formulaValues = [formulaCenter, formulaUp, formulaDown];
    let racingMusic,
        currentSong,
        lineCounter,
        songCounter,
        speedy,
        score,
        trophyCount,
        formulasCount,
        lightsOut,
        isButtonClicked;

    k.setBackground(132, 101, 236);
    k.loadFont(
        'Pixelify',
        './assets/fonts/PixelifySans-VariableFont_wght.ttf',
        { outline: 2 }
    );
    k.loadFont(
        'Pixelify2',
        './assets/fonts/PixelifySans-VariableFont_wght.ttf'
    );
    k.loadSound('collecttrophy', './assets/sounds/trophycollected.mp3');
    k.loadSound('losttrophy', './assets/sounds/trophylost.mp3');
    k.loadSound('celebratetrophies', './assets/sounds/celebratingtrophies.mp3');
    k.loadSound('formulaovertake', './assets/sounds/formulaovertake.mp3');
    k.loadSound('formulacrash', './assets/sounds/formulacrash.mp3');
    k.loadSound('celebrateformulas', './assets/sounds/celebratingformulas.mp3');
    k.loadSound('lightstart', './assets/sounds/lightstart.mp3');
    k.loadSound('racestart', './assets/sounds/racestart.mp3');
    k.loadSound('racemusic', './assets/sounds/racemusic.mp3');
    k.loadSound('racemusic2', './assets/sounds/racemusic2.mp3');
    k.loadSound('spectators', './assets/sounds/spectators.mp3');
    k.loadSprite('formula', './assets/sprites/formula.png');
    k.loadSprite('trophy', './assets/sprites/trophy.png');
    k.loadSprite('racemap', './assets/sprites/RaceBackground.png');

    k.loadSprite('formula', './assets/sprites/newformulasheet.png', {
        sliceX: 81,
        sliceY: 1,
        anims: {
            run: { from: 0, to: 80, loop: true, speed: 10 },
        },
    });

    hideCanvasFrame();

    k.scene('game', () => {
        lightsOut = false;
        score = 0;
        trophyCount = 0;
        formulasCount = 0;
        songCounter = 1;
        lineCounter = 0;
        speedy = 300;

        k.setGravity(0);
        k.add([
            k.sprite('racemap', {
                width: k.width(),
                height: k.height(),
            }),
            k.pos(0, 0),
            k.layer('bg'),
        ]);

        k.add([
            k.rect(k.width(), roadHeight),
            k.outline(4),
            k.pos(0, roadPosition),
            k.body({ isStatic: true }),
            k.color(55, 55, 55),
        ]);

        k.add([
            k.rect(2 * scaleFactor, roadHeight),
            k.pos(k.width() / 6, k.height() / 3),
            k.body({ isStatic: true }),
            k.color(100, 100, 100),
            k.area(),
            'wall',
        ]);

        const player = k.add([
            k.sprite('formula', { anim: 'run' }),
            k.pos(k.width() / 4, k.height() / 2 - 12 * scaleFactor),
            k.area(),
            k.body(),
            k.scale(scaleFactor),
            'player',
        ]);

        function changeLine() {
            if (lightsOut) {
                if (player.pos.y == formulaValues[0]) {
                    if (lineCounter == 0) {
                        player.pos.y = formulaValues[1];
                        lineCounter = 1;
                    } else if (lineCounter == 1) {
                        player.pos.y = formulaValues[2];
                        lineCounter = 0;
                    }
                } else if (player.pos.y == formulaValues[1]) {
                    player.pos.y = formulaValues[0];
                } else if (player.pos.y == formulaValues[2]) {
                    player.pos.y = formulaValues[0];
                }
            }
        }

        k.onKeyPress('space', changeLine);
        k.onClick(changeLine);

        function getRandomValueOfTrack() {
            const randomIndex = Math.floor(
                Math.random() * formulaValues.length
            );
            return formulaValues[randomIndex];
        }

        function spawnFormula() {
            if (!lightsOut) return;
            const spawnTrophy = Math.random() < 0.5;

            if (spawnTrophy) {
                var trophy = k.add([
                    k.sprite('trophy'),
                    k.area(),
                    k.pos(k.width(), getRandomValueOfTrack()),
                    k.move(k.LEFT, speedy),
                    k.scale(scaleFactor),
                    'trophy',
                ]);

                trophy.onCollide('player', () => {
                    trophy.destroy();
                    k.play('collecttrophy', {
                        volume: 0.5,
                        speed: 1,
                        loop: false,
                    });
                });

                trophy.onCollide('wall', () => {
                    trophy.destroy();
                    k.play('losttrophy', {
                        volume: 0.5,
                        speed: 1,
                        loop: false,
                    });
                });
            } else {
                const formula = k.add([
                    k.sprite('formula'),
                    k.area(),
                    k.body(),
                    k.pos(k.width(), getRandomValueOfTrack()),
                    k.move(k.LEFT, speedy),
                    k.scale(scaleFactor),
                    'otherformula',
                ]);

                formula.onCollide('wall', () => {
                    k.play('formulaovertake', {
                        volume: 1.2,
                        speed: 1,
                        loop: false,
                    });
                    formula.destroy();
                    formulasCount++;
                });
            }

            k.wait(k.rand(5, 3), spawnFormula);
        }

        function addLights() {
            var light1 = k.add([
                k.circle(roadHeight / 5 / 2 / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos(k.width() / 6 / 2, roadHeight + roadHeight / 6),
                'light1',
            ]);

            var light2 = k.add([
                k.circle(roadHeight / 5 / 2 / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos(k.width() / 6 / 2, roadHeight + 2 * (roadHeight / 6)),
                'light2',
            ]);

            var light3 = k.add([
                k.circle(roadHeight / 5 / 2 / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos(k.width() / 6 / 2, roadHeight + 3 * (roadHeight / 6)),
                'light3',
            ]);

            var light4 = k.add([
                k.circle(roadHeight / 5 / 2 / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos(k.width() / 6 / 2, roadHeight + 4 * (roadHeight / 6)),
                'light4',
            ]);

            var light5 = k.add([
                k.circle(roadHeight / 5 / 2 / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos(k.width() / 6 / 2, roadHeight + 5 * (roadHeight / 6)),
                'light5',
            ]);

            k.wait(1, () => {
                light1.color = k.rgb(255, 0, 0);
                k.play('lightstart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(2, () => {
                light2.color = k.rgb(255, 0, 0);
                k.play('lightstart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(3, () => {
                light3.color = k.rgb(255, 0, 0);
                k.play('lightstart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(4, () => {
                light4.color = k.rgb(255, 0, 0);
                k.play('lightstart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(5, () => {
                light5.color = k.rgb(255, 0, 0);
                k.play('lightstart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(7, () => {
                light1.color = k.rgb(0, 0, 0);
                light2.color = k.rgb(0, 0, 0);
                light3.color = k.rgb(0, 0, 0);
                light4.color = k.rgb(0, 0, 0);
                light5.color = k.rgb(0, 0, 0);
                lightsOut = true;
                k.play('racestart', {
                    volume: 0.5,
                    speed: 1,
                    loop: false,
                });
            });

            k.wait(8, () => {
                racingMusic = k.play('racemusic', {
                    volume: 0.5,
                    speed: 1,
                    loop: true,
                });
                spawnFormula();
            });
        }

        function addDashedLine(speedy) {
            const lineHeight = 2 * scaleFactor;
            const segmentWidth = 10 * scaleFactor;
            const segments = [];
            const upLine = roadPosition + roadHeight / 3;
            const downLine = roadPosition + 2 * (roadHeight / 3);
            let forward = true;
            let currentOffset = 0;

            function calculateInterval(speedy) {
                const minInterval = 0.05;
                const baseInterval = 0.1;
                return Math.max(minInterval, baseInterval / speedy);
            }

            function drawDashedLines(offset) {
                segments.forEach((segment) => {
                    segment.destroy();
                });
                segments.length = 0;

                for (
                    let x = k.width() / 6 + 2 * scaleFactor + offset;
                    x < k.width();
                    x += segmentWidth + segmentWidth
                ) {
                    const segment = k.add([
                        k.rect(segmentWidth, lineHeight),
                        k.pos(x, upLine),
                        k.color(255, 255, 255),
                        k.area(),
                        'dashedLine',
                    ]);
                    segments.push(segment);
                }

                for (
                    let x = k.width() / 6 + 2 * scaleFactor + offset;
                    x < k.width();
                    x += segmentWidth + segmentWidth
                ) {
                    const segment = k.add([
                        k.rect(segmentWidth, lineHeight),
                        k.pos(x, downLine),
                        k.color(255, 255, 255),
                        k.area(),
                        'dashedLine',
                    ]);
                    segments.push(segment);
                }
            }

            function updateDashedLines() {
                drawDashedLines(currentOffset);

                if (lightsOut) {
                    if (forward) {
                        currentOffset += segmentWidth;
                        if (currentOffset >= segmentWidth) {
                            forward = false;
                        }
                    } else {
                        currentOffset -= segmentWidth;
                        if (currentOffset <= 0) {
                            forward = true;
                        }
                    }
                }

                const interval = calculateInterval(speedy);
                k.wait(interval, updateDashedLines);
            }

            updateDashedLines();
        }

        addLights();
        addDashedLine(1);

        const textLabel = k.add([
            k.text('Sinusoid Formula', {
                size: k.height() / 3 / 3 / 3,
                font: 'Pixelify2',
            }),
            k.pos(k.width(), k.height() / 2),
            k.move(k.LEFT, speedy),
            k.offscreen({ destroy: true }),
            k.area(),
            k.color(132, 101, 236),
        ]);

        player.onCollide('otherformula', () => {
            speedy = 300;
            k.go('lose', score, formulasCount, trophyCount);
            racingMusic.stop();
            k.play('formulacrash', {
                volume: 0.5,
                speed: 1,
                loop: false,
            });
            k.addKaboom(player.pos);
        });

        textLabel.onCollide('wall', () => {
            textLabel.destroy();
        });

        player.onCollide('trophy', () => {
            trophyCount++;
        });

        const scoreLabel = k.add([
            k.text(`Score: ${score}`, { font: 'Pixelify' }),
            k.color(132, 101, 236),
            k.pos(k.width() / 2, k.height() / 4),
        ]);

        const trophyLabel = k.add([
            k.text(`Trophies: ${trophyCount}`, { font: 'Pixelify' }),
            k.color(132, 101, 236),
            k.pos(k.width() / 2, 3 * (k.height() / 4)),
        ]);

        const formulasLabel = k.add([
            k.text(`Formulas: ${formulasCount}`, { font: 'Pixelify' }),
            k.color(132, 101, 236),
            k.pos(k.width() / 2, 3 * (k.height() / 4)),
        ]);

        k.onUpdate(() => {
            if (lightsOut) {
                score++;
            }

            if (score != 0 && score % 1000 == 0) {
                k.play('spectators', {
                    volume: 1,
                    speed: 1,
                    loop: false,
                });

                if (songCounter == 0) {
                    currentSong = 'racemusic';
                    songCounter = 1;
                } else {
                    currentSong = 'racemusic2';
                    songCounter = 0;
                }

                racingMusic.stop();
                racingMusic = k.play(currentSong, {
                    volume: 0.5,
                    speed: 1,
                    loop: true,
                });
            }

            scoreLabel.text = `Score: ${score}`;
            trophyLabel.text = `Trophies: ${trophyCount}`;
            formulasLabel.text = `Formulas: ${formulasCount}`;
            scoreLabel.pos.x = k.width() / 2 - scoreLabel.width / 2;
            trophyLabel.pos.x = k.width() / 2 - trophyLabel.width / 2;
            formulasLabel.pos.x = k.width() / 2 - formulasLabel.width / 2;
            trophyLabel.pos.y =
                (k.width() / 2, 3 * (k.height() / 4) - trophyLabel.height);
            formulasLabel.pos.y =
                (k.width() / 2, 3 * (k.height() / 4) + formulasLabel.height);
            textLabel.pos.y =
                k.height() / 2 - textLabel.height / 2 + 2 * scaleFactor;
            speedy += 0.1 * scaleFactor;
        });
    });

    k.scene('lose', (score, formulasOvertaken, trophyCount) => {
        if (formulasOvertaken == 0) {
            score = score * 0.5;
        } else {
            score = score * formulasOvertaken * 2;
        }

        if (trophyCount == 0) {
            score = score * 0.5;
        } else {
            score = score * trophyCount;
        }

        k.add([
            k.text('Formulas: ' + formulasOvertaken, { font: 'Pixelify' }),
            k.pos(k.width() / 2, 1 * (k.height() / 7)),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        k.add([
            k.text('Trophies: ' + trophyCount, { font: 'Pixelify' }),
            k.pos(k.width() / 2, 2 * (k.height() / 7)),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        k.add([
            k.text('Final Score', { font: 'Pixelify' }),
            k.pos(k.width() / 2, 3 * (k.height() / 7) - k.height() / 28),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        k.add([
            k.text(Math.round(score), { font: 'Pixelify' }),
            k.pos(k.width() / 2, 3 * (k.height() / 7) + k.height() / 28),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        k.add([
            k.sprite('formula'),
            k.pos(k.width() / 2, 4 * (k.height() / 7)),
            k.scale(scaleFactor),
            k.anchor('center'),
        ]);

        const playAgainButton2 = k.add([
            k.text('Again', { font: 'Pixelify' }),
            k.pos(k.width() / 2 + k.width() / 4, 4 * (k.height() / 8)),
            k.area(),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        const exitButton2 = k.add([
            k.text('Exit', { font: 'Pixelify' }),
            k.pos(k.width() / 2 - k.width() / 4, 4 * (k.height() / 8)),
            k.area(),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        const playAgainButton = k.add([
            k.text('Play Again', { font: 'Pixelify' }),
            k.pos(k.width() / 2, 5 * (k.height() / 7)),
            k.area(),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        const exitButton = k.add([
            k.text('Exit', { font: 'Pixelify' }),
            k.pos(k.width() / 2, 6 * (k.height() / 7)),
            k.area(),
            k.anchor('center'),
            k.color(0, 255, 255),
        ]);

        async function countdownAndGo(button, scene) {
            for (let i = 5; i > 0; i--) {
                button.text = `${i}`;
                await k.wait(1);
            }

            if (scene === 'acade') {
                showCanvasFrame();
            }
            k.go(scene);
        }

        isButtonClicked = false;

        playAgainButton.onClick(() => {
            if (!isButtonClicked) {
                isButtonClicked = true;
                countdownAndGo(playAgainButton, 'game');
            }
        });

        exitButton.onClick(() => {
            if (!isButtonClicked) {
                isButtonClicked = true;

                countdownAndGo(exitButton, 'arcade');
            }
        });

        playAgainButton2.onClick(() => {
            if (!isButtonClicked) {
                isButtonClicked = true;
                countdownAndGo(playAgainButton2, 'game');
            }
        });

        exitButton2.onClick(() => {
            if (!isButtonClicked) {
                isButtonClicked = true;

                countdownAndGo(exitButton2, 'arcade');
            }
        });

        k.onKeyPress('space', () => {
            if (!isButtonClicked) {
                isButtonClicked = true;
                countdownAndGo(playAgainButton2, 'game');
            }
        });

        k.onClick(() => {
            if (!isButtonClicked) {
                isButtonClicked = true;
                countdownAndGo(playAgainButton2, 'game');
            }
        });
    });

    k.go('game');
}
