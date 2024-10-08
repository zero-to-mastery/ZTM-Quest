import { enterMapCityInteraction } from './enterMapCity.interactions';
import { enterMapForestInteraction } from './enterMapForest.interactions';
import { interactionWithFlowers } from './flowers.interactions';
import { interactionWithTree } from './tree.interactions';
import { interactionWithMushroom } from './mushroom.interactions';
import { collectCoins } from './collectCoins.interactions';

const interactions = [
    enterMapCityInteraction,
    enterMapForestInteraction,
    interactionWithFlowers,
    interactionWithTree,
    interactionWithFlowers,
    interactionWithMushroom,
    collectCoins,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
