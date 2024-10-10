import { enterMapCityInteraction } from './enterMapCity.interactions';
import { enterMapForestInteraction } from './enterMapForest.interactions';
import { interactionWithFlowers } from './flowers.interactions';
import { interactionWithTree } from './tree.interactions';
import { interactionWithMushroom } from './mushroom.interactions';

const interactions = [
    enterMapCityInteraction,
    enterMapForestInteraction,
    interactionWithFlowers,
    interactionWithTree,
    interactionWithFlowers,
    interactionWithMushroom,
];

export default interactions;