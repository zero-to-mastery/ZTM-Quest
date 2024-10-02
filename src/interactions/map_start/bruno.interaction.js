import { interactionHandler } from '../handler.interactions';
import { displayDialogueWithCharacter } from '../../utils';
import { conversationBruno, bruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
    interactionHandler(player, 'bruno', k, () => {
        player.isInDialog = true;
        displayDialogueWithCharacter(bruno.name, conversationBruno, () => {
            player.isInDialog = false;
            player.state.hasTalkedToBruno = true;
        });
    });
};
