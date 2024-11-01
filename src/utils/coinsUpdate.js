import { updateEnergyState } from './energyUpdate';
import { getGameState, setGameState } from './gameState';

export const purchaseItem = (k, cost, energy) => {
    const state = k.get('player')[0].state;

    if (state.coinsCollected - state.coinsSpent >= cost) {
        state.coinsSpent += cost;
        updateCoinsUI();
        updateEnergyState(state, energy);
    } else {
        k.debug.log("I don't have enough coins.");
    }
};

export const addCoins = (val) => {
    const gameState = getGameState();
    gameState.player.coinsCollected += val;
    setGameState(gameState);
    updateCoinsUI();
};

export const takeAwayCoins = (val) => {
    const gameState = getGameState();
    gameState.player.coinsCollected -= val;
    setGameState(gameState);
    updateCoinsUI();
};

export const updateCoinsUI = () => {
    const gameState = getGameState();
    const coinsRemain = document.getElementById('coins-remain');
    coinsRemain.innerText =
        gameState.player.coinsCollected - gameState.player.coinsSpent;
};
