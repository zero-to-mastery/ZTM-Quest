import { interactionWithBruno } from './bruno.interaction';
import { enterMapCityLeftInteraction } from './enterMapCityLeft.interaction';
import { enterMapCityRightInteraction } from './enterMapCityRight.interactions';
import { interactionWithMainboxMainArea } from './mailboxMainArea.interaction';
import { restroomInteractions } from './restroom.interactions';
import { interactionWithComputer } from './computer.interaction';
import { interactionWithJokeTeller } from './jokeTeller.interaction';
import { interactionWithDrinksMachine } from './drink_machine.interaction';

import { interactionWithMisterFu } from './misterFu.interaction';
import { interactionWithTV } from './tv_main_room.interaction';
import { interactionWithCake } from './cake.interaction';
import { interactionWithLocker } from './locker.interaction';
import { interactionWithCat } from './cat.interaction';
import { interactionWithTrashBin } from './trashBinLobby.interactions';
import { interactionWithPuff } from './puff.interaction';

const interactions = [
    restroomInteractions,
    interactionWithBruno,
    enterMapCityLeftInteraction,
    enterMapCityRightInteraction,
    interactionWithMainboxMainArea,
    interactionWithComputer,
    interactionWithJokeTeller,
    interactionWithDrinksMachine,
    // Add more interactions here
    interactionWithMisterFu,
    interactionWithTV,
    interactionWithCake,
    interactionWithLocker,
    interactionWithCat,
    interactionWithTrashBin,
    interactionWithPuff,
];

export default interactions;
