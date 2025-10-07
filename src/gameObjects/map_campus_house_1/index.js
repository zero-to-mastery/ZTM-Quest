import { computer } from './computer.gameObject';
import { mage } from './mage.gameObject';
import { backpack } from './backpack.gameObject';
import { banana } from './banana.gameObject';

import { getGameState } from '../../utils/gameState';
const state = getGameState();

const gameObjects = [
    computer,
    mage,
    banana,
    // Add more game objects here
];

if (!state.player.backpack) {
    gameObjects.push(backpack);
}

export default gameObjects;
