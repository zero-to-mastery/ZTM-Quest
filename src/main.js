import { k } from './kplayCtx';
import { getGameState, setGameState } from './utils/gameState';
import { updateEnergyUI } from './utils/energyUpdate';

import './scenes/start';
import './scenes/forest_junction';
import './scenes/arcade';
import { setCamScale } from './utils';
import './styles/global.css';

k.onResize(() => {
    setCamScale(k);
});

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
