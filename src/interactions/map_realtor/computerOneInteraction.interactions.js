import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const computerOneInteraction = (player, k) => {
    interactionHandler(player, 'computer_1', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'You currently see nothing that you understand what so ever on this computer',
                'It looks like so techy that you question your life choices',
            ],
        });
    });
};
