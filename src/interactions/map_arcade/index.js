import { enterMapCityInteraction } from './enterMapCity.interactions';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine4 } from './game_machine_4.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';
import { collectCoins } from './collectCoins.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine4,
    interactionWithGameMachine6,
    collectCoins
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
