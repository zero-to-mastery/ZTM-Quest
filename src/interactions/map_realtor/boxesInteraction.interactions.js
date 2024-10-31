import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const boxesInteraction = (player, k) => {
    interactionHandler(player, 'boxes', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'Bunch of boxes here... nothing to see (Just an Xbox One laying in the corner hehehe)',
            ],
        });
    });
};
