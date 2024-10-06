import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    // new interaction
    interactionWithGameMachine2,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
