import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationBruno, bruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
    interactionHandler(player, bruno.name, k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: bruno.name,
            text: conversationBruno,
            onDisplayEnd: () => {
                player.isInDialog = false;
                player.state.hasTalkedToBruno = true;
            },
        });
    });
};
