import { enterMapCityInteraction } from './enterMapCity.interactions';

import { interactionWithGameMachine1 } from './game_machine_1.intercation';
import { interactionWithGameMachine8 } from './game_machine_8';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine4 } from './game_machine_4.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';
import { interactionWithJessie } from './jessie.interaction';
import { interactionWithGameMachine10 } from './game_machine_10.interactions';
import { interactionWithGameMachine11 } from './game_machine_11.interaction';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    interactionWithGameMachine1,
    // new interaction
    interactionWithGameMachine2,

    interactionWithJessie,

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine4,
    interactionWithGameMachine6,
    interactionWithGameMachine8,
    interactionWithGameMachine10,
    interactionWithGameMachine11,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
