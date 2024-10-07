import { npcInteractionHandler } from '../handler.interactions';
import { displayDialogueWithCharacter } from '../../utils';
import { conversationBruno, bruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
    npcInteractionHandler(player, bruno.name, k, () => {
        player.isInDialog = true;
        displayDialogueWithCharacter({
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
