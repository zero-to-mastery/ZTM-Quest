import { k } from '../../kplayCtx';

import { npcsInCityMap } from './npcsOnmap_city';
const gameObjects = [
    npcsInCityMap,
    // Add more game objects here

];

export const addGameObjects = (map, spawnpoints) => {
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
