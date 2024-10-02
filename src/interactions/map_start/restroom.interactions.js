import { displayDialogueWithoutCharacter } from '../../utils';
import { stopCharacterAnims } from '../../utils/animation';

export const restroomInteractions = (player, k, map) => {
    player.onCollide('restroom_toilet', () => {
        player.state.wasInRestroom = true;
        player.isInDialog = true;
        stopCharacterAnims(player);
        player.state.hasHandsWashed = false;
        const dialog = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!player.state.hasTalkedToBruno) {
            dialog.push('You should talk to Bruno first.');
        }
        displayDialogueWithoutCharacter(dialog, () => {
            player.isInDialog = false;
        });
    });

    player.onCollide('restroom_sink', () => {
        player.isInDialog = true;
        stopCharacterAnims(player);
        displayDialogueWithoutCharacter(
            ['You washed your hands. Good job!'],
            () => {
                player.state.hasHandsWashed = true;
                player.isInDialog = false;
            }
        );
    });
};
