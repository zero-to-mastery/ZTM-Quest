import { enterMapCityInteraction } from './enterMapCity.interactions';
import { bedInteractions } from './bed.interaction';
import { computerInteractions } from './computer.interaction';
import { mageInteractions } from './mage.interaction';
import { bedroomVanityInteractions } from './bedroomVanity.interaction';
import { kitchenFridgeInteractions } from './kitchenFridge.interaction';
import { bedroomShelfInteractions } from './bedroomShelf.interaction';
import { livingRoomCouchInteractions } from './livingRoomCouch.interaction';
import { bedroomTableInteractions } from './bedroom_table.interaction';
import { diningRoomTableInteractions } from './dining_room_table.interaction';

const interactions = [
    // Add more interactions here
    enterMapCityInteraction,
    bedInteractions,
    computerInteractions,
    mageInteractions,
    bedroomVanityInteractions,
    kitchenFridgeInteractions,
    bedroomShelfInteractions,
    livingRoomCouchInteractions,
    bedroomTableInteractions,
    diningRoomTableInteractions,
    restroomToiletInteractions,

];

export default interactions;
