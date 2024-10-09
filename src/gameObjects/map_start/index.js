import { bruno } from './bruno.gameObject';
import { cake } from './cake.gameObject';
import { npcsOnChairs } from './npcsOnChairs.gameObject';
import { ztmTrailer } from './ztmTrailer.gameObject';
import { computer } from './computer.gameObject';

import { misterFu } from './misterFu.gameObject';

import { jokeTellerNPC } from './jokeTellerNPC.gameObject';
import { tvVideo } from './tv_main_room_video.gameObject';
import { randNpcsOnRestroomSinkCounch } from './randNpcsOnRestroomSinkCounch.gameObject';
import { hideOnReference } from '../../core/kaplay/components/hideOnReference';
import { DISTANCE_TO_HIDE_OBJECT } from '../../constants';

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

export const addGameObjects = (k, map, spawnpoints) => {
    const player = k.get('player')[0];

    return gameObjects.reduce((gameObjAcc, cb) => {
        const temp = cb(k, map, spawnpoints);

        if (Array.isArray(temp)) {

            temp.forEach(comp => comp.use(hideOnReference({ hide: true, pause: true, distance: DISTANCE_TO_HIDE_OBJECT, referenceGameObj: player })))
            gameObjAcc.push(...temp);
            return gameObjAcc;
        }

        temp.use(hideOnReference({ hide: true, pause: true, distance: DISTANCE_TO_HIDE_OBJECT, referenceGameObj: player }));
        gameObjAcc.push(temp);

        return gameObjAcc;
    }, []);
};
