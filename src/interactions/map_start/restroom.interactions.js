import { displayDialogueWithoutCharacter } from '../../utils';

export const restroomInteractions = (player, k, map) => {
    player.onCollide('restroom_toilet', () => {
        player.state.wasInRestroom = true;
        player.isInDialog = true;
        player.state.hasHandsWashed = false;
        const dialog = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!player.state.hasTalkedToBruno) {
            dialog.push('You should talk to Bruno first.');
        }
        displayDialogueWithoutCharacter({
            k,
            player,
            dialog,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });

    player.onCollide('restroom_sink', () => {
        player.isInDialog = true;
        displayDialogueWithoutCharacter({
            k,
            player,
            text: ['You washed your hands. Good job!'],
            onDisplayEnd: () => {
                player.state.hasHandsWashed = true;
                player.isInDialog = false;
            },
        });
    });
};
