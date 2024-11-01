import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const fridgeInteraction = (player, k) => {
    interactionHandler(player, 'fridge', k, async () => {
        const decisionToEat = await displayPermissionBox({
            k,
            player,
            text: ['Would you like to eat?'],
        });

        if (decisionToEat) {
            displayDialogue({
                k,
                player,
                text: ['You eat some greek yogurt', 'Specifically Chobani!'],
            });

            updateEnergyState(player.state, 10);
        }
    });
};
