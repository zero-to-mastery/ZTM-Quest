import { displayDialogueWithCharacter } from '../../utils';
import { conversationBruno, bruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
    player.onCollide('bruno', () => {
        player.isInDialog = true;
        displayDialogueWithCharacter({
            k,
            player,
            characterName: bruno.name,
            test: conversationBruno,
            onDisplayEnd: () => {
                player.isInDialog = false;
                player.state.hasTalkedToBruno = true;
            },
        });
    });
};
