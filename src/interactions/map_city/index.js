import { boundaryArcadeInteraction } from './boundaryArcade.interaction';
import { boundaryBurgerBarInteraction } from './boundaryBurgerBar.interaction';
import { enterMapApartmentInteraction } from './enterMapApartment.interaction';
import { enterMapArcadeInteraction } from './enterMapArcade.interactions';
import { enterMapForestJunctionInteraction } from './enterMapForestJunction.interactions';
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
    enterMapForestJunctionInteraction,
    boundaryBurgerBarInteraction,
    boundaryArcadeInteraction,
    snackBarRedInteraction,
    snackBarGreenInteraction,
    snackBarStreetInteraction,
    stall1Interaction,
    stall2Interaction,
    // Add more interactions here
    enterMapApartmentInteraction
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
