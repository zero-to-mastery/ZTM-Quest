import { firstConversationArcade } from '../../constants';
import { displayDialogueWithCharacter } from '../../utils';

export const firstInteractionWithUncleBob = (player, k, map) => {
    player.onCollide('uncle_bob', () => {
        player.isInDialog = true;
        displayDialogueWithCharacter(
            'Uncle Bob',
            firstConversationArcade,
            () => {
                player.isInDialog = false;
                player.uncleBobVisitOne = true;
            }
        );
    });
};
