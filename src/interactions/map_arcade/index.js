import { storeMainAreaInteraction } from '../map_city/enterStoreMainArea.interaction';
import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine4 } from './game_machine_4.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here
<<<<<<< HEAD
    storeMainAreaInteraction,
    interactionWithArcadeArea
=======

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine4,
    interactionWithGameMachine6,
>>>>>>> 9e9f897d07f0657ac27665dadd59bf5fb272dc7f
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
