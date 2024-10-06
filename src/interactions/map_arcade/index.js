import { enterMapCityInteraction } from './enterMapCity.interactions';

import {interactionWithJessie} from './jessie.interaction';

import { interactionWithGameMachine2 } from './game_machine_2.interactions';


const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    interactionWithJessie


    // new interaction
    interactionWithGameMachine2,

];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
