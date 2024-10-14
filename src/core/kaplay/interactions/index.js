import { k } from '../../../kplayCtx';

export const attachInteractions = (interactions, gameObjTag) => {
    const map = k.get('main_map')[0];
    const gameObj = k.get(gameObjTag)[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
