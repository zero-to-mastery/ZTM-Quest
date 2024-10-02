import { displayDialogue } from '../../utils';
import { conversationBruno } from '../../constants';
import { interactionHandler } from '../handler.interactions';

export const interactionWithBruno = (player, k, map) => {
    interactionHandler(player, 'bruno', k, () => {
        player.isInDialog = true;
        displayDialogue(conversationBruno, () => {
            player.isInDialog = false;
            player.hasTalkedToBruno = true;
        });
    });
};
