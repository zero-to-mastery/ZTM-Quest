import { interactionWithBruno } from './bruno.interaction';
import { enterMapCityInteraction } from './enterMapCity.interaction';
import { interactionWithMainboxMainArea } from './mailboxMainArea.interaction';
import { restroomInteractions } from './restroom.interactions';
import { interactionWithComputer } from './computer.interaction';
import { interactionWithJokeTeller } from './jokeTeller.interaction';
import { interactionWithMisterFu } from './misterFu.interaction';

const interactions = [
    restroomInteractions,
    interactionWithBruno,
    enterMapCityInteraction,
    interactionWithMainboxMainArea,
    interactionWithComputer,
    interactionWithJokeTeller,
    // Add more interactions here
    interactionWithMisterFu, 
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
