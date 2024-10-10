import { enterMapCityInteraction } from './enterMapCity.interactions';
import { bedInteractions } from './bed.interaction';

const interactions = [
    // Add more interactions here
    enterMapCityInteraction,
    bedInteractions,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
