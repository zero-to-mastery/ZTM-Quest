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
import { enterMapClassroomInteraction } from './enterMapClassroomInteraction.interactions';
import { enterMapSeasideInteraction } from './enterMapSeasideInteraction.interactions';
import { enterMapExtendedCampus } from './enterMapExtendedCampus.interactions';
import { enterMapExtendedCampusTop } from './enterMapExtendCampusTop.interactions';
import { interactionWithBin } from './bin.interaction';
import { interactionWithSoccerBall } from './soccerBall.interaction';

const interactions = [
    enterMapArcadeInteraction,
    enterMapStartLeftInteraction,
    enterMapStartRightInteraction,
    enterMapForestJunctionInteraction,
    enterMapClassroomInteraction,
    enterMapSeasideInteraction,
    enterMapExtendedCampus,
    enterMapExtendedCampusTop,
    boundaryBurgerBarInteraction,
    boundaryArcadeInteraction,
    snackBarRedInteraction,
    snackBarGreenInteraction,
    snackBarStreetInteraction,
    stall1Interaction,
    stall2Interaction,
    // Add more interactions here
    enterMapCampusHouse1Interaction,
    interactionWithBin,
    interactionWithSoccerBall,
];

export default interactions;
