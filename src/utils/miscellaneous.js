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

// Achievements related

const showAchievements = () => {
    showAlertWindow();
    const achievementsAlert = document.querySelector('.achievements-alert');
    achievementsAlert.classList.add('display-block');

    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';

    const achievements = getGameState().player.achievements;
    const completed = [];
    const inProgress = [];
    for (const name in achievements) {
        if (name === 'Food enthusiast') {
            if (achievements[name].length === 6) {
                completed.push(name);
            } else {
                inProgress.push(name);
            }
        } else if (name === 'Stay hydrated and healthy') {
            if (achievements[name] === 5) {
                completed.push(name);
            } else {
                inProgress.push(name);
            }
        } else if (name === 'Arcade gamer') {
            if (achievements[name].length === 5) {
                completed.push(name);
            } else {
                inProgress.push(name);
            }
        } else if (name === "Let's go fishing!") {
            if (achievements[name]) {
                completed.push(name);
            } else {
                inProgress.push(name);
            }
        }
    }

    for (const name of completed) {
        // Create alert item
        const alertItem = document.createElement('div');
        alertItem.classList.add('alert-item');
        alertItem.classList.add('active-item');
        // Create text for alert item
        const alertItemText = document.createElement('p');
        alertItemText.classList.add('alert-item-text');
        alertItemText.innerHTML = name;
        // Create description for alert item
        const alertItemDesc = document.createElement('p');
        alertItemDesc.classList.add('alert-item-desc');
        // Create status of alert item
        const alertItemStatus = document.createElement('p');
        alertItemStatus.classList.add('alert-item-status');
        alertItemStatus.innerHTML = 'Completed';
        if (name === 'Food enthusiast') {
            alertItemDesc.innerHTML = 'Try out all the food in stalls of city.';
        } else if (name === 'Stay hydrated and healthy') {
            alertItemDesc.innerHTML = 'Drink water 5 times.';
        } else if (name === 'Arcade gamer') {
            alertItemDesc.innerHTML = 'Play atleast 5 games in arcade store.';
        } else if (name === "Let's go fishing!") {
            alertItemDesc.innerHTML = 'Go for fishing one time.';
        }
        // Append all child items to alert item
        alertItem.appendChild(alertItemText);
        alertItem.appendChild(alertItemDesc);
        alertItem.appendChild(alertItemStatus);

        achievementsList.appendChild(alertItem);
    }

    for (const name of inProgress) {
        // Create alert item
        const alertItem = document.createElement('div');
        alertItem.classList.add('alert-item');
        // Create text for alert item
        const alertItemText = document.createElement('p');
        alertItemText.classList.add('alert-item-text');
        alertItemText.innerHTML = name;
        // Create description for alert item
        const alertItemDesc = document.createElement('p');
        alertItemDesc.classList.add('alert-item-desc');
        // Create status of alert item
        const alertItemStatus = document.createElement('p');
        alertItemStatus.classList.add('alert-item-status');
        alertItemStatus.innerHTML = 'In Progress';
        if (name === 'Food enthusiast') {
            alertItemDesc.innerHTML = 'Try out all the food in stalls of city.';
        } else if (name === 'Stay hydrated and healthy') {
            alertItemDesc.innerHTML = 'Drink water 5 times.';
        } else if (name === 'Arcade gamer') {
            alertItemDesc.innerHTML = 'Play atleast 5 games in arcade store.';
        } else if (name === "Let's go fishing!") {
            alertItemDesc.innerHTML = 'Go for fishing one time.';
        }
        // Append all child items to alert item
        alertItem.appendChild(alertItemText);
        alertItem.appendChild(alertItemDesc);
        alertItem.appendChild(alertItemStatus);

        achievementsList.appendChild(alertItem);
    }
};

const hideAchievements = () => {
    const achievementsAlert = document.querySelector('.achievements-alert');
    achievementsAlert.classList.remove('display-block');
    hideAlertWindow();
};

const achievementsButton = document.getElementById('achievements-button');
achievementsButton.addEventListener('click', showAchievements);
const achievementsCloseButton = document.getElementById(
    'achievements-close-button'
);
achievementsCloseButton.addEventListener('click', hideAchievements);
