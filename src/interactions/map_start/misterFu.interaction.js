import { displayDialogueWithCharacter } from '../../utils';
import { npcInteractionHandler } from '../handler.interactions';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    player.onCollide('misterFu', () => {
        player.isInDialog = true;
        
        npcInteractionHandler(player, misterFu.name, k, () => {

            displayDialogueWithCharacter({
                k,
                player,
                characterName: misterFu.name,
                test: conversationMisterFu,
                onDisplayEnd: () => {
                    player.isInDialog = false;
                    player.state.hasTalkedToMisterFu = true;
                },
            });
        })
    });
}