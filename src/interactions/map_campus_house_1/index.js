import { k } from '../../kplayCtx';

import { enterMapCityInteraction } from './enterMapCity.interactions';
import { bedInteractions } from './bed.interaction';

const interactions = [
    // Add more interactions here
    enterMapCityInteraction,
    bedInteractions,
];

export const attachInteractions = (gameObjTag) => {
    const map = k.get('main_map')[0];
    const gameObj = k.get(gameObjTag)[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
