import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const dressersInteraction = (player, k) => {
    interactionHandler(player, 'dressers', k, async () => {
        displayDialogue({
            k,
            player,
            text: ['You see a bunch of clothes hanging from the closet'],
        });
    });
};
