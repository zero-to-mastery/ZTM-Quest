import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const signRightInteraction = (player, k) => {
    interactionHandler(player, 'sign_right', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                '"Your future awaits—let us help you find the perfect place to call home."',
            ],
        });
    });
};
