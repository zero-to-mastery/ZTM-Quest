import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

let abort;

export const interactionWithGameMachine12 = (player, k, map) => {
    player.onCollide('game_machine_12', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Do you want to play "Pattern Memory Challenge"?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Starting Pattern Memory Challenge... Get ready!',
                        ],
                        onDisplayEnd: () => {
                            startPatternMemoryGame(k);
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 12'
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

function startPatternMemoryGame(k) {
    const levels = [
        { sequenceLength: 3, timeLimit: 5 },
        { sequenceLength: 5, timeLimit: 4 },
        { sequenceLength: 7, timeLimit: 3 },
        { sequenceLength: 9, timeLimit: 3 },
        { sequenceLength: 11, timeLimit: 3 },
    ];

    let currentLevel = 0;
    let score = 0;
    let currentSequence = [];
    let userSequence = [];
    let isGameActive = true;

    function loadLevel(level) {
        userSequence = [];
        currentSequence = generateSequence(levels[level].sequenceLength);
        if (currentLevel > 0) {
            k.go('patternMemory');
        } else {
            k.go('startScreen', {
                title: 'Memorize the pattern!',
                gameSceneName: 'patternMemory',
            });
        }
    }

    k.scene('patternMemory', () => {
        if (currentLevel < levels.length && isGameActive) {
            const sequenceToDisplay = currentSequence.join(' ');
            k.add([
                k.text(`Memorize this pattern: ${sequenceToDisplay}`),
                k.pos(k.width() / 2, k.height() / 2 - 50),
                k.anchor('center'),
            ]);

            k.wait(levels[currentLevel].timeLimit, () => {
                k.go('enterPattern');
            });
        }
    });

    k.scene('enterPattern', () => {
        const inputLabel = k.add([
            k.text('Enter the pattern: '),
            k.pos(k.width() / 2, k.height() / 2 - 50),
            k.anchor('center'),
        ]);

        let userInput = '';

        k.onKeyPress('enter', () => {
            userSequence = userInput.split('').map(Number);
            checkPattern();
        });

        k.onKeyPress('backspace', () => {
            userInput = userInput.slice(0, -1);
            inputLabel.text = `Enter the pattern: ${userInput}`;
        });

        for (let i = 0; i <= 9; i++) {
            k.onKeyPress(i.toString(), () => {
                if (isGameActive) {
                    userInput += i;
                    inputLabel.text = `Enter the pattern: ${userInput}`;
                }
            });
        }
    });

    function checkPattern() {
        if (arraysEqual(currentSequence, userSequence)) {
            score += 10;
            currentLevel++;
            if (currentLevel < levels.length) {
                loadLevel(currentLevel);
            } else {
                k.go('win', score);
            }
        } else {
            isGameActive = false;
            k.go('lose', {
                title: 'Memorize the pattern!',
                gameRestartSceneName: 'patternMemory',
                gameExitSceneName: 'arcade',
                score,
            });
        }
    }

    k.scene('win', (finalScore) => {
        k.add([
            k.text(`Congratulations! Your score: ${finalScore}`),
            k.pos(k.width() / 2, k.height() / 2 - 50),
            k.anchor('center'),
            k.scale(2),
        ]);

        const playAgainBtn = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 20),
            k.anchor('center'),
            k.area(),
        ]);

        playAgainBtn.onClick(() => {
            currentLevel = 0;
            score = 0;
            isGameActive = true;
            loadLevel(currentLevel);
        });
    });

    loadLevel(currentLevel);
}

function generateSequence(length) {
    const sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(Math.floor(Math.random() * 10));
    }
    return sequence;
}

function arraysEqual(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}
