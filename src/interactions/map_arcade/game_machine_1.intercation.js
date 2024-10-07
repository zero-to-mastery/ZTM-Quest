import { displayDialogue } from '../../utils';

export const interactionWithGameMachine1 = (player, k, map) => {
    player.onCollide('game_machine_1', () => {
        if (player.isInDialog) return;
        console.log('Player collided with game machine 1');
        player.isInDialog = true;
        showCustomPrompt(
            'Do you want to play "Guess the Number: Extreme Edition"?', 
            ['Yes', 'No'], 
            (selectedOption) => {
                console.log(`Selected option: ${selectedOption}`);
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting Zero to Hero... Good luck!'],
                        onDisplayEnd: () => {
                            console.log('Dialog ended, starting the game.');
                            player.isInDialog = false;
                            openGuessTheNumberGame(k, player);
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
                        onDisplayEnd: () => {
                            console.log('Dialog ended, no game started.');
                            player.isInDialog = false;
                            closeCustomPrompt();
                        },
                    });
                }
            }
        );
    });
};

function showCustomPrompt(message, options, callback) {
    const promptElement = document.getElementById('custom-prompt');
    if (!promptElement) {
        console.error('Custom prompt element not found.');
        return;
    }
    promptElement.style.display = 'block';
    promptElement.innerHTML = `
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">${message}</h2>
            <div style="display: flex; justify-content: center; gap: 10px;">
                ${options.map(option => `<button class="prompt-btn" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">${option}</button>`).join('')}
            </div>
        </div>
    `;
    const buttons = promptElement.getElementsByClassName('prompt-btn');
    Array.from(buttons).forEach((button, index) => {
        button.addEventListener('click', () => {
            callback(options[index]);
            closeCustomPrompt();
        });
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#2980b9';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#3498db';
        });
    });
}

function closeCustomPrompt() {
    const promptElement = document.getElementById('custom-prompt');
    if (promptElement) {
        promptElement.style.display = 'none';
    } else {
        console.error('Custom prompt element not found for closing.');
    }
}

function openGuessTheNumberGame(k, player) {
    const gameWindow = window.open('', 'GuessTheNumber', 'width=600,height=400');
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 10;
    let score = 1000;
    let timeLeft = 60;
    let difficulty = 'normal';
    let hintUsed = false;

    gameWindow.document.write(`
        <html>
        <head>
            <title>Guess the Number: Extreme Edition</title>
            <style>
                body { font-family: 'Arial', sans-serif; text-align: center; background-color: #f0f8ff; margin: 0; padding: 20px; }
                h1 { color: #2c3e50; }
                #game-container { background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                #message { font-size: 18px; color: #34495e; margin: 15px 0; }
                input, button { margin: 10px; padding: 10px; font-size: 16px; }
                input { width: 100px; }
                button { background-color: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s; }
                button:hover { background-color: #2980b9; }
                button:disabled { background-color: #bdc3c7; cursor: not-allowed; }
                #stats { display: flex; justify-content: space-around; margin-top: 20px; }
                .stat { font-weight: bold; }
                #hint-button { background-color: #e67e22; }
                #hint-button:hover { background-color: #d35400; }
                #difficulty-selector { margin: 15px 0; }
            </style>
        </head>
        <body>
            <div id="game-container">
                <h1>Guess the Number: Extreme Edition</h1>
                <div id="difficulty-selector">
                    <label for="difficulty">Difficulty:</label>
                    <select id="difficulty">
                        <option value="easy">Easy (1-50)</option>
                        <option value="normal" selected>Normal (1-100)</option>
                        <option value="hard">Hard (1-200)</option>
                    </select>
                </div>
                <p id="message">Guess a number between 1 and 100</p>
                <input type="number" id="guessInput" min="1" max="100">
                <button id="submitGuess">Submit Guess</button>
                <button id="hint-button">Use Hint (-100 points)</button>
                <button id="quitGame">Quit Game</button>
                <div id="stats">
                    <div class="stat">Attempts: <span id="attempts">0</span>/<span id="maxAttempts">${maxAttempts}</span></div>
                    <div class="stat">Score: <span id="score">${score}</span></div>
                    <div class="stat">Time: <span id="time">${timeLeft}</span>s</div>
                </div>
            </div>
            <script>
                let targetNumber = ${targetNumber};
                let attempts = ${attempts};
                let maxAttempts = ${maxAttempts};
                let score = ${score};
                let timeLeft = ${timeLeft};
                let difficulty = '${difficulty}';
                let hintUsed = ${hintUsed};
                
                const messageElement = document.getElementById('message');
                const guessInput = document.getElementById('guessInput');
                const submitButton = document.getElementById('submitGuess');
                const quitButton = document.getElementById('quitGame');
                const hintButton = document.getElementById('hint-button');
                const attemptsElement = document.getElementById('attempts');
                const scoreElement = document.getElementById('score');
                const timeElement = document.getElementById('time');
                const difficultySelector = document.getElementById('difficulty');

                function updateStats() {
                    attemptsElement.textContent = attempts;
                    scoreElement.textContent = score;
                    timeElement.textContent = timeLeft;
                }

                function setDifficulty(diff) {
                    difficulty = diff;
                    switch(diff) {
                        case 'easy':
                            targetNumber = Math.floor(Math.random() * 50) + 1;
                            guessInput.max = 50;
                            messageElement.textContent = 'Guess a number between 1 and 50';
                            break;
                        case 'normal':
                            targetNumber = Math.floor(Math.random() * 100) + 1;
                            guessInput.max = 100;
                            messageElement.textContent = 'Guess a number between 1 and 100';
                            break;
                        case 'hard':
                            targetNumber = Math.floor(Math.random() * 200) + 1;
                            guessInput.max = 200;
                            messageElement.textContent = 'Guess a number between 1 and 200';
                            break;
                    }
                }

                difficultySelector.addEventListener('change', (e) => {
                    setDifficulty(e.target.value);
                    resetGame();
                });

                function resetGame() {
                    attempts = 0;
                    score = 1000;
                    timeLeft = 60;
                    hintUsed = false;
                    updateStats();
                    submitButton.disabled = false;
                    hintButton.disabled = false;
                }

                function makeGuess() {
                    const guess = parseInt(guessInput.value);
                    attempts++;
                    score = Math.max(0, score - 50);  // Deduct 50 points per guess

                    if (guess === targetNumber) {
                        messageElement.textContent = \`Congratulations! You guessed the number in \${attempts} attempts!\`;
                        submitButton.disabled = true;
                        clearInterval(timer);
                    } else if (attempts >= maxAttempts || timeLeft <= 0) {
                        messageElement.textContent = \`Sorry, you've run out of attempts or time. The number was \${targetNumber}.\`;
                        submitButton.disabled = true;
                        clearInterval(timer);
                    } else {
                        const hint = guess < targetNumber ? 'higher' : 'lower';
                        messageElement.textContent = \`The number is \${hint}. Try again!\`;
                    }
                    updateStats();
                }

                function useHint() {
                    if (!hintUsed) {
                        hintUsed = true;
                        score = Math.max(0, score - 100);  // Deduct 100 points for using a hint
                        const range = Math.floor(targetNumber / 10) * 10;
                        messageElement.textContent = \`Hint: The number is between \${range} and \${range + 10}\`;
                        hintButton.disabled = true;
                        updateStats();
                    }
                }

                submitButton.addEventListener('click', makeGuess);
                hintButton.addEventListener('click', useHint);
                quitButton.addEventListener('click', () => window.close());
                guessInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') makeGuess();
                });

                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        submitButton.disabled = true;
                        messageElement.textContent = \`Time's up! The number was \${targetNumber}.\`;
                    }
                    updateStats();
                }, 1000);
            </script>
        </body>
        </html>
    `);

    gameWindow.focus();  
}