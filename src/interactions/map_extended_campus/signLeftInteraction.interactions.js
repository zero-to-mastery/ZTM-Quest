import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const signLeftInteraction = (player, k) => {
    interactionHandler(player, 'sign_left', k, async () => {
        displayDialogue({
            k,
            player,
            text: ['"Finding your dream home, one step at a time."'],
        });
    });
};
