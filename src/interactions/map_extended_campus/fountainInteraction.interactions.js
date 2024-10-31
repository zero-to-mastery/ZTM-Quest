import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const fountainInteraction = (player, k) => {
    interactionHandler(player, 'fountain', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'The fountain\'s gentle flow seems to whisper, "May your journey be as calm as these waters."',
            ],
        });
    });
};
