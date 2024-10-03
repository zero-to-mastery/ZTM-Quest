import { firstInteractionWithUncleBob } from './uncleBob.interaction';
import { enterMapCityInteraction } from './enterMapCity.interactions';

const interactions = [
    enterMapCityInteraction,
    firstInteractionWithUncleBob,
    // Add more interactions here
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
