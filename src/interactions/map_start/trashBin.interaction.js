import { displayDialogue } from '../../utils';

export const interactionWithTrashBin = (player, k, map) => {
    player.onCollide('trash_bin_lobby', () => {
        player.isInDialog = true;
        player.changePlayer()
        displayDialogue({
            k,
            player,
            text: ['You found some new clothes!'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
