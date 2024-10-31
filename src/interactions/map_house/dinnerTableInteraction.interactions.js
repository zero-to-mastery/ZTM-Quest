import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const dinnerTableInteraction = (player, k) => {
    interactionHandler(player, 'dinner_table', k, async () => {
        const decisionToEat = await displayPermissionBox({
            k,
            player,
            text: ['Would you like to eat some food?'],
        });

        if (decisionToEat) {
            await displayDialogue({
                k,
                player,
                text: ['You eat some Ramen...', 'MMM, yum!'],
            });

            updateEnergyState(player.state, 10);
        }
    });
};
