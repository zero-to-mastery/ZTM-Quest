import { boundaryArcadeInteraction } from './boundaryArcade.interaction';
import { boundaryBurgerBarInteraction } from './boundaryBurgerBar.interaction';
import { enterMapArcadeInteraction } from './enterMapArcade.interactions';
import { enterMapForestInteraction } from './enterMapForest.interactions';
import { enterMapStartLeftInteraction } from './enterMapStartLeft.interactions';
import { enterMapStartRightInteraction } from './enterMapStartRight.interactions';
import {
    snackBarRedInteraction,
    snackBarGreenInteraction,
    snackBarStreetInteraction,
} from './snackBars.interactions';
import { stall1Interaction, stall2Interaction } from './stalls.interaction';

const interactions = [
    enterMapArcadeInteraction,
    enterMapStartLeftInteraction,
    enterMapStartRightInteraction,
    enterMapForestInteraction,
    boundaryBurgerBarInteraction,
    boundaryArcadeInteraction,
    snackBarRedInteraction,
    snackBarGreenInteraction,
    snackBarStreetInteraction,
    stall1Interaction,
    stall2Interaction,
    // Add more interactions here
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
