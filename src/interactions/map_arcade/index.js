import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';
import { interactionWithGameMachine11 } from './game_machine_11.interaction';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine6,
    interactionWithGameMachine11,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
