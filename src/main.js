import { k } from './kplayCtx';
import { getGameState, setGameState } from './utils/gameState';
import { updateEnergyUI } from './utils/energyUpdate';

import './scenes/start';
import { setCamScale } from './utils';
import './styles/global.css';

k.onResize(() => {
    setCamScale(k);
});

k.go('start');

updateEnergyUI(getGameState().player.energy);
const intervalRef = setInterval(() => {
    const gameState = getGameState(); // This should be inside setInterval so that gameState variable is updated at every interval.
    if (gameState.player.energy) {
        gameState.player.energy -= 1;
        setGameState(gameState);
        updateEnergyUI(gameState.player.energy);
    } else {
        k.debug.log('I need some energy.');
    }
}, 10000);
