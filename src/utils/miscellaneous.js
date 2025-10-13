import { k, time } from '../kplayCtx';
import { getGameState } from './gameState';

// Mobile menu related
const leftPanel = document.getElementById('left-panel');

const showMiscMenu = () => {
    leftPanel.classList.add('show-misc-menu');
};

const hideMiscMenu = () => {
    leftPanel.classList.remove('show-misc-menu');
    k.canvas.focus(); // This ensures every time misc menu is closed then the canvas get back the focus.
};

const miscMenuButton = document.getElementById('misc-menu-button');
const closeBtn = leftPanel.getElementsByClassName('close-btn')[0];
miscMenuButton.addEventListener('click', showMiscMenu);
closeBtn.addEventListener('click', hideMiscMenu);

// Alert window

const showAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.add('display-flex');
};

const hideAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.remove('display-flex');
    hideMiscMenu(); // This is for the mobile view.
};

// Help related

const showHelp = () => {
    showAlertWindow();
    const helpAlert = document.querySelector('.help-alert');
    helpAlert.classList.add('display-block');
};

const hideHelp = () => {
    const helpAlert = document.querySelector('.help-alert');
    helpAlert.classList.remove('display-block');
    hideAlertWindow();
};

const helpButton = document.getElementById('help-button');
helpButton.addEventListener('click', showHelp);
const helpCloseButton = document.getElementById('help-close-button');
helpCloseButton.addEventListener('click', hideHelp);

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