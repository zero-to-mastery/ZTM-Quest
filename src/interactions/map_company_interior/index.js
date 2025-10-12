import { bossInteraction } from './bossInteraction.interactions';
import { enterMapCompanyInteriorInteraction } from './enterMapCompanyInterior.interactions';
import { receptionInteraction } from './receptionInteraction.interactions';

const interactions = [
    enterMapCompanyInteriorInteraction,
    receptionInteraction,
    bossInteraction,
];

export default interactions;
