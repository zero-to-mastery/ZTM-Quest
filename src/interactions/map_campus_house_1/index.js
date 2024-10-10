import { enterMapCityInteraction } from './enterMapCity.interactions';
import { bedInteractions } from './bed.interaction';
import { computerInteractions } from './computer.interaction';
import { bedroomVanityInteractions } from './bedroomVanity.interaction';

const interactions = [
    // Add more interactions here
    enterMapCityInteraction,
    bedInteractions,
    computerInteractions,
    bedroomVanityInteractions
];

export default interactions;
