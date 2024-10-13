import { k } from './kplayCtx';
import { getGameState, setGameState, clearSavedGame } from './utils/gameState';
import { updateEnergyUI } from './utils/energyUpdate';

import './styles/global.css';

import { start } from './scenes/start';
import { city } from './scenes/city';
import { arcade } from './scenes/arcade';
import { forest } from './scenes/forest';
import { forestJunction } from './scenes/forest_junction';
import { campusHouse1 } from './scenes/campus_house_1';
import { bootstrap } from './scenes/bootstrap';
import { gameStartScreen } from './scenes/gameMachine/startSceen';
import { loseScreen } from './scenes/gameMachine/lose';

k.scene('start', (enter_tag) => bootstrap(start, { enter_tag }));
k.scene('city', (enter_tag) => bootstrap(city, { enter_tag }));
k.scene('arcade', (enter_tag) => bootstrap(arcade, { enter_tag }));
k.scene('forest', (enter_tag) => bootstrap(forest, { enter_tag }));
k.scene('forest_junction', (enter_tag) =>
    bootstrap(forestJunction, { enter_tag })
);
k.scene('campus_house_1', (enter_tag) =>
    bootstrap(campusHouse1, { enter_tag })
);

// Game Machine Scenes
k.scene('startScreen', gameStartScreen);
k.scene('lose', loseScreen);

k.go('start');

// To test different maps instead of going through each and every scene to get to yours,
// Import the scene, name the scene, and then name the spawn point as an additional tag
// k.go('insert_scene_name_here', 'insert_spawn_point_here');

/*
    Spawn Points
    Start - spawn_left, spawn_right
    City - spawn_left, spawn_top, spawn_arcade, spawn_right, spawn_office_left, spawn_office_right
    Arcade - player (No need to add a tag)
    Forest Junction - spawn_bottom, spawn_top, spawn_right
    Forest - spawn_bottom, spawn_topright, spawn_topleft
    Campus House - player (No need to add a tag)
*/

updateEnergyUI(getGameState().player.energy);
setInterval(() => {
    const gameState = getGameState(); // This should be inside setInterval so that gameState variable is updated at every interval.
    if (gameState.player.energy) {
        gameState.player.energy -= 1;
        setGameState(gameState);
        updateEnergyUI(gameState.player.energy);
    } else {
        k.debug.log('I need some energy.');
    }
}, 10000);

// ** Settings functionality **

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
    showAlertWindow();
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.add('display-block');
};

const clickNewGameNo = () => {
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.remove('display-block');
    hideAlertWindow();
};

const clickNewGameYes = () => {
    clearSavedGame();
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
    const player = k.get('player')[0];
    const coinsCollected = player.collectedCoins;
    const coinsSpent = 0;

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

// ** Settings functionality end **
