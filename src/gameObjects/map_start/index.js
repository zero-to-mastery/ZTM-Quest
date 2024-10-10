import { k } from '../../kplayCtx';

import { bruno } from './bruno.gameObject';
import { cake } from './cake.gameObject';
import { npcsOnChairs } from './npcsOnChairs.gameObject';
import { ztmTrailer } from './ztmTrailer.gameObject';
import { computer } from './computer.gameObject';

import { misterFu } from './misterFu.gameObject';

import { jokeTellerNPC } from './jokeTellerNPC.gameObject';
import { tvVideo } from './tv_main_room_video.gameObject';
import { randNpcsOnRestroomSinkCounch } from './randNpcsOnRestroomSinkCounch.gameObject';

const gameObjects = [
    bruno,
    npcsOnChairs,
    ztmTrailer,
    computer,
    cake,
    jokeTellerNPC,
    // Add more game objects here
    randNpcsOnRestroomSinkCounch,
    misterFu,
    tvVideo,
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
