import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const bagDialogue = [
    'You picked up the bag!',
];

export const interactionWithBag = (player, k, map) => {
    interactionHandler(player, 'bag', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'bag',
            text: bagDialogue,
            onDisplayEnd: async () => {
                player.isInDialog = false;
                player.state.hasBackpack = true;
                k.destroy(k.get('bag')[0]);
            },
        });
    });
};
