import { enterMapCityInteraction } from './enterMapCity.interactions';

import { interactionWithGameMachine1 } from './game_machine_1.interactions';
import { interactionWithGameMachine8 } from './game_machine_8.interactions';
import { interactionWithGameMachine2 } from './game_machine_2.interactions';
import { interactionWithGameMachine4 } from './game_machine_4.interactions';
import { interactionWithGameMachine6 } from './game_machine_6.interactions';
import { interactionWithJessie } from './jessie.interaction';
import { interactionWithRico } from './rico.interaction';
import { interactionWithGameMachine10 } from './game_machine_10.interactions';
import { interactionWithGameMachine11 } from './game_machine_11.interaction';
import { interactionWithGameMachine12 } from './game_machine_12.interaction';
import { interactionWithGameMachine3 } from './game_machine_3.interactions';
import { interactionWithGameMachineCrawl } from './game_machine_crawl.interaction';
import { interactionWithGameMachine9 } from './game_machine_9.interactions';
import { interactionWithGameMachine5 } from './game_machine_5.interactions';
import { interactionWithGameMachine7 } from './game_machine_7.interaction';
import { interactionWithGameMachine13 } from './game_machine_13.interactions';
//import { interactionWithGameMachine14 } from './game_machine_14.interactions';

const interactions = [
    enterMapCityInteraction,
    // Add more interactions here

    interactionWithGameMachine1,
    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine3,

    interactionWithJessie,
    interactionWithRico,

    // new interaction
    interactionWithGameMachine2,
    interactionWithGameMachine4,
    interactionWithGameMachine6,
    interactionWithGameMachine7,
    interactionWithGameMachine8,
    interactionWithGameMachine9,
    interactionWithGameMachine10,
    interactionWithGameMachine11,
    interactionWithGameMachine12,
    interactionWithGameMachineCrawl,
    interactionWithGameMachine5,
    interactionWithGameMachine13,
    //interactionWithGameMachine14,
];

export default interactions;
