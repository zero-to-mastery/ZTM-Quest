import { storeMainAreaInteraction } from '../map_city/enterStoreMainArea.interaction';
import { enterMapCityInteraction } from './enterMapCity.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here
    storeMainAreaInteraction,
    interactionWithArcadeArea
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
