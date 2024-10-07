import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const lumberDialogue = [
    "The wood is weathered and cracked, left to the elements for far too long. Moss has begun to creep up the sides, and old nails stick out at odd angles, rusted and forgotten."
];

export const interactionWithLumber = (player, k, map) => {
    interactionHandler(player, 'lumber', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'lumber',
            text: lumberDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
