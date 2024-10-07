import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine1 } from './game_machine_1.intercation';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here
    interactionWithGameMachine1,
    // new interaction
    interactionWithGameMachine2,
    
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
