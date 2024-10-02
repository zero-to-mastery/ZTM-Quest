import { displayDialogueWithoutCharacter } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const restroomInteractions = (player, k, map) => {
    interactionHandler(player, 'restroom_toilet', k, () => {
        player.state.wasInRestroom = true;
        player.isInDialog = true;
        player.state.hasHandsWashed = false;
        const dialog = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!player.state.hasTalkedToBruno) {
            dialog.push('You should talk to Bruno first.');
        }
        displayDialogueWithoutCharacter(dialog, () => {
            player.isInDialog = false;
        });
    });

    interactionHandler(player, 'restroom_sink', k, () => {
        player.isInDialog = true;
        displayDialogueWithoutCharacter(
            ['You washed your hands. Good job!'],
            () => {
                player.state.hasHandsWashed = true;
                player.isInDialog = false;
            }
        );
    });
};
