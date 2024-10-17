import { displayDialogue } from '../../utils';

export const interactionWithGameMachine9 = (player, k, map) => {
    player.onCollide('game_machine_9', () => {
        player.isInDialog = true;
        showCustomPrompt(
            'Do you want to play "Color Sequence Puzzle"?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'Starting Color Sequence Puzzle... Get ready!',
                        ],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startColorSequencePuzzle(k);
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

function startColorSequencePuzzle(k) {
    const colors = [
        k.rgb(255, 0, 0),   
        k.rgb(0, 0, 255),    
        k.rgb(0, 255, 0),    
        k.rgb(255, 255, 0),  
        k.rgb(128, 0, 128)  
    ];
    const colorNames = ['red', 'blue', 'green', 'yellow', 'purple'];
    const levels = [
        { sequenceLength: 3, timeLimit: 5 },
        { sequenceLength: 4, timeLimit: 6 },
        { sequenceLength: 5, timeLimit: 7 },
        { sequenceLength: 6, timeLimit: 8 },
        { sequenceLength: 7, timeLimit: 9 },
    ];

    let currentLevel = 0;
    let score = 0;
    let currentSequence = [];
    let userSequence = [];
    let isGameActive = true;

    function getResponsiveScale() {
        return Math.min(k.width(), k.height()) / 800;
    }

    function resetGameState() {
        currentLevel = 0;
        score = 0;
        currentSequence = [];
        userSequence = [];
        isGameActive = true;
    }

    function loadLevel(level) {
        userSequence = [];
        currentSequence = generateColorSequence(levels[level].sequenceLength);
        k.go('countdown');
    }

    k.scene('countdown', () => {
        let count = 3;
        const countText = k.add([
            k.text(count.toString()),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
            k.scale(4 * getResponsiveScale()),
        ]);

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countText.text = count.toString();
            } else {
                clearInterval(timer);
                k.go('colorSequence');
            }
        }, 1000);
    });

    k.scene('colorSequence', () => {
        k.add([
            k.text(`Level ${currentLevel + 1}`),
            k.pos(k.width() / 2, 50 * getResponsiveScale()),
            k.anchor('center'),
            k.scale(getResponsiveScale()),
        ]);

        const sequenceDisplay = k.add([
            k.rect(400 * getResponsiveScale(), 70 * getResponsiveScale()),
            k.pos(k.width() / 2, k.height() / 2 - 50 * getResponsiveScale()),
            k.anchor('center'),
            k.color(k.rgb(220, 220, 220)),
        ]);

        let displayIndex = 0;
        const displayInterval = setInterval(() => {
            if (displayIndex < currentSequence.length) {
                sequenceDisplay.color = colors[colorNames.indexOf(currentSequence[displayIndex])];
                displayIndex++;
                k.wait(0.5, () => {
                    sequenceDisplay.color = k.rgb(220, 220, 220);
                });
            } else {
                clearInterval(displayInterval);
                k.wait(1, () => {
                    k.go('enterSequence');
                });
            }
        }, 1000);

        k.add([
            k.text('Watch the sequence'),
            k.pos(k.width() / 2, k.height() / 2 + 50 * getResponsiveScale()),
            k.anchor('center'),
            k.scale(getResponsiveScale()),
        ]);
    });

    k.scene('enterSequence', () => {
        k.add([
            k.text(`Level ${currentLevel + 1}`),
            k.pos(k.width() / 2, 50 * getResponsiveScale()),
            k.anchor('center'),
            k.scale(getResponsiveScale()),
        ]);

        const colorButtons = colors.map((color, index) => {
            return k.add([
                k.circle(50 * getResponsiveScale()),
                k.pos(k.width() / 2 + (index - 2) * 120 * getResponsiveScale(), k.height() / 2), // Increased spacing
                k.color(color),
                k.area(),
                'colorButton',
                { colorValue: colorNames[index] },
            ]);
        });

        const inputDisplay = k.add([
            k.rect(300 * getResponsiveScale(), 50 * getResponsiveScale()),
            k.pos(k.width() / 2, k.height() / 2 - 100 * getResponsiveScale()),
            k.anchor('center'),
            k.color(k.rgb(220, 220, 220)),
        ]);

        k.onClick('colorButton', (button) => {
            if (isGameActive) {
                userSequence.push(button.colorValue);
                updateInputDisplay();
                if (userSequence.length === currentSequence.length) {
                    checkSequence();
                }
            }
        });

        function updateInputDisplay() {
            inputDisplay.color = colors[colorNames.indexOf(userSequence[userSequence.length - 1])];
        }

        const repeatButton = k.add([
            k.text('Repeat Sequence'),
            k.pos(k.width() / 2, k.height() / 2 + 150 * getResponsiveScale()),
            k.anchor('center'),
            k.area(),
            k.scale(getResponsiveScale()),
        ]);

        repeatButton.onClick(() => {
            k.go('colorSequence');
        });
    });

    function checkSequence() {
        if (arraysEqual(currentSequence, userSequence)) {
            score += 10;
            currentLevel++;
            if (currentLevel < levels.length) {
                k.wait(1, () => {
                    loadLevel(currentLevel);
                });
            } else {
                k.go('win', score);
            }
        } else {
            isGameActive = false;
            k.go('lose', score);
        }
    }

    k.scene('win', (finalScore) => {
        k.add([
            k.text(`Congratulations!\nYour score: ${finalScore}`),
            k.pos(k.width() / 2, k.height() / 2 - 50 * getResponsiveScale()),
            k.anchor('center'),
            k.scale(2 * getResponsiveScale()),
        ]);

        const playAgainBtn = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 50 * getResponsiveScale()),
            k.anchor('center'),
            k.area(),
            k.scale(getResponsiveScale()),
        ]);

        playAgainBtn.onClick(() => {
            resetGameState();
            loadLevel(currentLevel);
        });
    });

    k.scene('lose', (finalScore) => {
        k.add([
            k.text(`Game Over!\nYour score: ${finalScore}`),
            k.pos(k.width() / 2, k.height() / 2 - 50 * getResponsiveScale()),
            k.anchor('center'),
            k.scale(2 * getResponsiveScale()),
        ]);

        const playAgainBtn = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 50 * getResponsiveScale()),
            k.anchor('center'),
            k.area(),
            k.scale(getResponsiveScale()),
        ]);

        playAgainBtn.onClick(() => {
            resetGameState();
            loadLevel(currentLevel);
        });
    });

    function generateColorSequence(length) {
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(colorNames[Math.floor(Math.random() * colorNames.length)]);
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

    loadLevel(currentLevel);
}

function showCustomPrompt(message, options, callback) {
    const promptElement = document.getElementById('custom-prompt');
    const messageElement = document.getElementById('prompt-message');
    const optionsContainer = document.getElementById('options-container');

    if (!promptElement || !messageElement || !optionsContainer) {
        console.error('Required DOM elements for custom prompt not found');
        return;
    }

    messageElement.textContent = message;
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.onclick = () => {
            callback(option);
            closeCustomPrompt();
        };
        optionsContainer.appendChild(button);
    });

    promptElement.style.display = 'flex';
}

function closeCustomPrompt() {
    const promptElement = document.getElementById('custom-prompt');
    if (promptElement) {
        promptElement.style.display = 'none';
    }
}
