import { displayDialogue } from '../../utils';

export const restroomInteractions = (player, k, map) => {
    player.onCollide('restroom_toilet', () => {
        player.wasInRestroom = true;
        player.isInDialog = true;
        const dialog = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!player.hasTalkedToBruno) {
            dialog.push('You should talk to Bruno first.');
        }
        displayDialogue(dialog, () => {
            player.isInDialog = false;
        });
    });

    player.onCollide('restroom_sink', () => {
        player.isInDialog = true;
        displayDialogue(['You washed your hands. Good job!'], () => {
            player.hasHandsWashed = true;
            player.isInDialog = false;
        });
    });
};
