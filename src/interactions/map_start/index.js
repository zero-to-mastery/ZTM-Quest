import { interactionWithBruno } from './bruno.interaction';
import { enterMapCityInteraction } from './enterMapCity.interaction';
import { interactionWithMainboxMainArea } from './mailboxMainArea.interaction';
import { restroomInteractions } from './restroom.interactions';
import { } from '../map_city/enterStoreMainArea.interaction';

const interactions = [
    restroomInteractions,
    interactionWithBruno,
    enterMapCityInteraction,
    interactionWithMainboxMainArea,
    // Add more interactions here
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
