import { displayDialogue } from '../../utils';

export const interactionWithLocker = (player, k, map) => {
    player.onCollide('cabin_edge_room_1', () => {
        player.isInDialog = true;
        player.changePlayer();
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
