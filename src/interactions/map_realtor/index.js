import { behindDeskClerkInteraction } from './behindDeskClerkInteraction.interactions';
import { boxesInteraction } from './boxesInteraction.interactions';
import { computerOneInteraction } from './computerOneInteraction.interactions';
import { computerTwoInteraction } from './computerTwoInteraction.interactions';
import { fridgeInteraction } from './fridgeInteraction.interactions';
import { counterClerkInteraction } from './counterClerkInteraction.interactions';
import { enterMapExtendedCampus } from './enterMapExtendedCampus.interactions';

const interactions = [
    enterMapExtendedCampus,
    behindDeskClerkInteraction,
    boxesInteraction,
    computerOneInteraction,
    computerTwoInteraction,
    counterClerkInteraction,
    fridgeInteraction,
];

export default interactions;
