import { displayDialogueWithCharacter } from '../../utils';
import { conversationBruno, bruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
    player.onCollide('bruno', () => {
        player.isInDialog = true;
        displayDialogueWithCharacter(bruno.name, conversationBruno, () => {
            player.isInDialog = false;
            player.state.hasTalkedToBruno = true;
        });
    });
};
