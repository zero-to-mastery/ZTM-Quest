import { computer } from './computer.gameObject';
import { mage } from './mage.gameObject';
import { backpack } from './backpack.gameObject';

import { getGameState } from '../../utils/gameState';
const state = getGameState();

const gameObjects = [
    computer,
    mage,
    // Add more game objects here
];

if (!state.player.backpack) {
    gameObjects.push(backpack);
}

export default gameObjects;
