import { computer } from './computer.gameObject';
import { mage } from './mage.gameObject';
import { backpack } from './backpack.gameObject';
import { banana } from './banana.gameObject';

import { getGameState } from '../../utils/gameState';

export const getGameObjects = () => {
    // This function ensures the creation of backpack when new game is started without needing to refresh.
    // If gameObjects is directly exported then following procedure doesn't create backpack unless the website is refreshed.
    // collect backpack -> website refresh -> start new game -> enter map_campus_house_1
    const gameObjects = [
        computer,
        mage,
        banana,
        // Add more game objects here
    ];
    const state = getGameState();

    if (!state.player.backpack) {
        gameObjects.push(backpack);
    }

    return gameObjects;
};
