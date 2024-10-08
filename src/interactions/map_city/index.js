import { boundaryArcadeInteraction } from './boundaryArcade.interaction';
import { boundaryBurgerBarInteraction } from './boundaryBurgerBar.interaction';
import { enterMapCampusHouse1Interaction } from './enterMapCampusHouse1.interaction';
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
import { collectCoins } from './collectCoins.interactions';

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
    enterMapCampusHouse1Interaction,
    collectCoins,
];

export const attachInteractions = (gameObj, k) => {
    const map = k.get('main_map')[0];

    interactions.forEach((cb) => cb(gameObj, k, map));
};
