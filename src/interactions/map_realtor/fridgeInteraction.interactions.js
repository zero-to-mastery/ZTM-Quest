import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const fridgeInteraction = (player, k) => {
    interactionHandler(player, 'fridge', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'No, you cannot go looking for food here, this is for employees only...',
            ],
        });
    });
};
