
import { jessie } from "./jessie.gameObject";

import { npcsInArcadeMap } from './npcsOnmap';

const gameObjects = [
    npcsInArcadeMap,
    // Add more game objects here
    jessie,
];

export const addGameObjects = (k, map, spawnpoints) => {
    return gameObjects.reduce((gameObjAcc, cb) => {
        const temp = cb(k, map, spawnpoints);

        if (Array.isArray(temp)) {
            gameObjAcc.push(...temp);
            return gameObjAcc;
        }

        gameObjAcc.push(temp);

        return gameObjAcc;
    }, []);
};
