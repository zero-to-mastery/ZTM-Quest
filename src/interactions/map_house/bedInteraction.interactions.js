import { interactionHandler } from '../handler.interactions';
import { displayPermissionBox } from '../../utils';
import { time } from '../../kplayCtx';
import { updateEnergyState } from '../../utils/energyUpdate';

export const bedInteraction = (player, k) => {
    interactionHandler(player, 'bed', k, async () => {
        const decisionToSleep = await displayPermissionBox({
            k,
            player,
            text: ['Would you like to sleep?'],
        });
        if (decisionToSleep) {
            time.addHours(8);
            updateEnergyState(player.state, 100);
        }
    });
};
