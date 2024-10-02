import { displayDialogueWithCharacter } from '../../utils';
import { conversationBruno, bruno } from '../../constants';
import { stopCharacterAnims } from '../../utils/animation';

export const interactionWithBruno = (player, k, map) => {
    player.onCollide('bruno', () => {
        player.isInDialog = true;
        stopCharacterAnims(player);
        displayDialogueWithCharacter(bruno.name, conversationBruno, () => {
            player.isInDialog = false;
            player.state.hasTalkedToBruno = true;
        });
    });
};
