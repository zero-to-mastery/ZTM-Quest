import { interactionWithBruno } from './bruno.interaction';
import { enterMapCityInteraction } from './enterMapCity.interaction';
import { interactionWithMainboxMainArea } from './mailboxMainArea.interaction';
import { restroomInteractions } from './restroom.interactions';
import { interactionWithComputer } from './computer.interaction';
import { interactionWithJokeTeller } from './jokeTeller.interaction';
import { interactionWithDrinksMachine } from './drink_machine.interaction';

import { interactionWithMisterFu } from './misterFu.interaction';
import { interactionWithTV } from './tv_main_room.interaction';
import { interactionWithCake } from './cake.interaction';
import { interactionWithTrashBin } from './trashBin.interaction';

const interactions = [
    restroomInteractions,
    interactionWithBruno,
    enterMapCityInteraction,
    interactionWithMainboxMainArea,
    interactionWithComputer,
    interactionWithJokeTeller,
    interactionWithDrinksMachine,
    // Add more interactions here
    interactionWithMisterFu,
    interactionWithTV,
    interactionWithCake,
    interactionWithTrashBin
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
