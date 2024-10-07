import { enterMapCityInteraction } from './enterMapCity.interactions';
import { enterMapForestInteraction } from './enterMapForest.interactions';
import { interactionWithFlowers } from './flowers.interactions';

const interactions = [
    enterMapCityInteraction,
    enterMapForestInteraction,
    interactionWithFlowers,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
