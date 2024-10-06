import { enterMapCityInteraction } from './enterMapCity.interactions';
import {interactionWithJessie} from './jessie.interaction';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here
    interactionWithJessie
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
