import { enterMapArcadeInteraction } from './enterMapArcade.interactions';

const interactions = [enterMapArcadeInteraction];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
