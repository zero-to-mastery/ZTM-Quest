import { firstInteractionWithArcadeEmployee } from './arcade_employee.interaction';
import { enterMapCityInteraction } from './enterMapCity.interactions';

const interactions = [
    enterMapCityInteraction,
    firstInteractionWithArcadeEmployee
    // Add more interactions here
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
