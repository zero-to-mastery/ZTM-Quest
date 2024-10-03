import { storeMainAreaInteraction } from '../map_city/enterStoreMainArea.interaction';
import { enterMapCityInteraction } from './enterMapCity.interactions';
const gameObjects = [
    // Add more game objects here
    storeMainAreaInteraction,
    interactionWithArcadeArea
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
