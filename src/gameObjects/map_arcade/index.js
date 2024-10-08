import { hideOnReference } from '../../core/kaplay/components/hideOnReference';
import { npcsInArcadeMap } from './npcsOnmap';
const gameObjects = [
    npcsInArcadeMap,
    // Add more game objects here
];

export const addGameObjects = (k, map, spawnpoints) => {
    const player = k.get('player')[0];

    return gameObjects.reduce((gameObjAcc, cb) => {
        const temp = cb(k, map, spawnpoints);

        if (Array.isArray(temp)) {
            temp.forEach(comp => comp.use(hideOnReference({ hide: true, pause: true, distance: 400, referenceGameObj: player })))
            gameObjAcc.push(...temp);
            return gameObjAcc;
        }

        temp.use(hideOnReference({ hide: true, pause: true, distance: 400, referenceGameObj: player }));
        gameObjAcc.push(temp);

        return gameObjAcc;
    }, []);
};
