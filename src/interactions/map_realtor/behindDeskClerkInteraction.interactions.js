import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const behindDeskClerkInteraction = (player, k) => {
    interactionHandler(player, 'behind_desk', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                "Uhh... You aren't supposed to be behind here",
                'Get out dude',
            ],
        });
    });
};
