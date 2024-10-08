import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine8 } from './game_machine_8';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine4 } from './game_machine_4.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';
import { interactionWithGameMachine10 } from './game_machine_10.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine4,
    interactionWithGameMachine6,
    interactionWithGameMachine8,
    interactionWithGameMachine10,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
