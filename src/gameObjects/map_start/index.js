import { bruno } from './bruno.gameObject';
import { cake } from './cake.gameObject';
import { npcsOnChairs } from './npcsOnChairs.gameObject';
import { ztmTrailer } from './ztmTrailer.gameObject';
import { computer } from './computer.gameObject';
<<<<<<< HEAD

import { misterFu } from './misterFu.gameObject';

=======
import { jokeTellerNPC } from './jokeTellerNPC.gameObject';
>>>>>>> 512ce3f3184bdde96d1833cf9540cc3559345b00
const gameObjects = [
    bruno,
    npcsOnChairs,
    ztmTrailer,
    computer,
    cake,
    jokeTellerNPC,
    // Add more game objects here
    misterFu,
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
