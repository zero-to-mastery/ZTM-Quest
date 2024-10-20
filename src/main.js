import { k, time } from './kplayCtx';
import { getGameState, setGameState } from './utils/gameState';
import { updateEnergyUI } from './utils/energyUpdate';
import { start } from './scenes/start';
import './scenes/gameOver';
import './styles/global.css';

import { city } from './scenes/city';
import { arcade } from './scenes/arcade';
import { forest } from './scenes/forest';
import { forestJunction } from './scenes/forest_junction';
import { campusHouse1 } from './scenes/campus_house_1';
import { bootstrap } from './scenes/bootstrap';
import { bootstrap as miniGameBootstrap } from './scenes/fishing_minigame/scene/bootstrap';
import { fishing } from './scenes/fishing_minigame/scene/fishing';
import { gameStartScreen } from './scenes/gameMachine/startSceen';
import { loseScreen } from './scenes/gameMachine/lose';
import { classroom } from './scenes/classroom';
import { seaside } from './scenes/seaside';

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
k.scene('classroom', (enter_tag) => bootstrap(classroom, { enter_tag }));
k.scene('seaside', (enter_tag) => bootstrap(seaside, { enter_tag }));
k.scene('fishing', (enter_tag) => miniGameBootstrap(fishing, { enter_tag }));

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

const clock = document.getElementById('clock');

setInterval(() => {
    displayTime();
    if (!time.paused) {
        time.addMinutes(k.dt());
        if (Math.ceil(time.seconds) % 60 === 0) {
            time.seconds = 0;
            time.addHours(1);
        }
        if (time.minutes % 24 === 0) {
            time.minutes = 0;
        }
    }
}, 10);

function displayTime() {
    const minutes = Math.ceil(time.minutes);
    const seconds = Math.ceil(time.seconds);
    clock.innerHTML = `${minutes < 10 ? `0${minutes}` : `${minutes % 24}`}:${seconds < 10 ? `0${seconds % 60}` : `${seconds % 60}`}`;
}

const creditsButton = document.getElementById('credits-button');

if (creditsButton) {
    creditsButton.addEventListener('click', () => {
        const rightPanel = document.getElementById('right-panel');
        rightPanel.classList.toggle('show-settings');

        k.go('gameOver');
    });
}
