import { k, time } from '../kplayCtx';
import { getGameState, clearSavedGame } from './gameState';
import { updateCoinsUI } from './coinsUpdate';

// Mobile menu related

const showSettings = () => {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.classList.add('show-settings');
};

const hideSettings = () => {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.classList.remove('show-settings');
    k.canvas.focus(); // This ensures every time settings is closed then the canvas get back the focus.
};

const menuButton = document.getElementById('menu-button');
const closeBtn = document.getElementById('close-btn');
menuButton.addEventListener('click', showSettings);
closeBtn.addEventListener('click', hideSettings);

// Alert window

const showAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.add('display-flex');
};

const hideAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.remove('display-flex');
    hideSettings(); // This is for the mobile view.
};

// New game related
const clickNewGame = () => {
    time.pause();
    showAlertWindow();
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.add('display-block');
};

const clickNewGameNo = () => {
    time.unpause();
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.remove('display-block');
    hideAlertWindow();
};

const clickNewGameYes = () => {
    time.unpause();
    time.reset();
    clearSavedGame();
    updateCoinsUI();
    clickNewGameNo();
    k.go('start');
};

const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', clickNewGame);
const newGameNoButton = document.getElementById('new-game-no-button');
newGameNoButton.addEventListener('click', clickNewGameNo);
const newGameYesButton = document.getElementById('new-game-yes-button');
newGameYesButton.addEventListener('click', clickNewGameYes);

// Stats related

const showStats = () => {
    time.pause();
    const player = getGameState().player;
    const coinsCollected = player.coinsCollected;
    const coinsSpent = player.coinsSpent;

    // Calculation for time spent in game
    const timeSpent = k.time();
    const timeSpentSeconds = Math.floor(timeSpent % 60);
    const timeSpentMinutes = Math.floor((timeSpent / 60) % 60);
    const timeSpentHours = Math.floor(timeSpent / 3600);
    const timeSpentString = `${timeSpentHours}h ${timeSpentMinutes}m ${timeSpentSeconds}s`;

    // Adding updated info in html
    const coinsCollectedElement = document.getElementById('coins-collected');
    coinsCollectedElement.innerHTML = `Coins collected : ${coinsCollected}`;
    const coinsSpentElement = document.getElementById('coins-spent');
    coinsSpentElement.innerHTML = `Coins spent : ${coinsSpent}`;
    const timeSpentElement = document.getElementById('time-spent');
    timeSpentElement.innerHTML = `Time spent : ${timeSpentString}`;

    showAlertWindow();
    const statsAlert = document.querySelector('.stats-alert');
    statsAlert.classList.add('display-block');
};

const hideStats = () => {
    time.unpause();
    const statsAlert = document.querySelector('.stats-alert');
    statsAlert.classList.remove('display-block');
    hideAlertWindow();
};

const statsButton = document.getElementById('stats-button');
statsButton.addEventListener('click', showStats);
const statsCloseButton = document.getElementById('stats-close-button');
statsCloseButton.addEventListener('click', hideStats);

// Debug related

const toggleDebugMode = () => {
    k.debug.inspect = !k.debug.inspect;
    hideSettings(); // This is for the mobile view.
};

const debugButton = document.getElementById('debug-button');
debugButton.addEventListener('click', toggleDebugMode);

// Audio related
const toggleAudio = () => {
    if (k.audioCtx.state.includes('running')) {
        k.audioCtx.suspend();
        audioIcon.src = 'assets/sprites/mute.png';
    } else {
        k.audioCtx.resume();
        audioIcon.src = 'assets/sprites/audio-on.png';
    }
};
const audioIcon = document.getElementById('audio-icon');

const audioButton = document.getElementById('audio-button');
audioButton.addEventListener('click', toggleAudio);
