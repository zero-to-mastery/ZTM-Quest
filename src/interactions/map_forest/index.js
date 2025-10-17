import { enterMapForestJunctionInteraction } from './enterMapForestJunction.interactions';
import { interactionWithTree } from './tree.interactions';
import { interactionWithSwampyLog } from './swampyLog.interactions';
import { interactionWithShrub } from './shrub.interactions';
import { interactionWithLumber } from './lumber.interactions';
import { interactionWithHouse } from './house.interactions';
import { interactionWithHole } from './hole.interactions';
import { interactionWithFlower } from './flower.interactions';
import { interactionWithFirepit } from './firepit.interactions';
import { interactionWithPond } from './pond.interactions';
import { interactionWithFlashDrive } from './flashDrive.interactions';

const interactions = [
    enterMapForestJunctionInteraction,
    interactionWithTree,
    interactionWithSwampyLog,
    interactionWithShrub,
    interactionWithLumber,
    interactionWithHouse,
    interactionWithHole,
    interactionWithFlower,
    interactionWithFirepit,
    interactionWithPond,
    interactionWithFlashDrive,
];

export default interactions;
