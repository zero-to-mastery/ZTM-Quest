import { bruno } from './bruno.gameObject';
import { npcsOnChairs } from './npcsOnChairs.gameObject';
import { ztmTrailer } from './ztmTrailer.gameObject';

const gameObjects = [
    bruno,
    npcsOnChairs,
    ztmTrailer,
    // Add more game objects here
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
