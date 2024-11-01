import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const computerInteraction = (player, k) => {
    interactionHandler(player, 'computer', k, async () => {
        displayDialogue({
            k,
            player,
            text: ['Zero To Mastery invites you to learn today!'],
        });
    });
};
