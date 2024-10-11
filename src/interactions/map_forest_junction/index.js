import { enterMapCityInteraction } from './enterMapCity.interactions';
import { enterMapForestInteraction } from './enterMapForest.interactions';
import { interactionWithFlowers } from './flowers.interactions';
import { interactionWithTree } from './tree.interactions';
import { interactionWithMushroom } from './mushroom.interactions';
import { interactionWithLake } from './lake.interactions';

const interactions = [
    enterMapCityInteraction,
    enterMapForestInteraction,
    interactionWithFlowers,
    interactionWithTree,
    interactionWithFlowers,
    interactionWithMushroom,
    interactionWithLake,
];

export default interactions;
