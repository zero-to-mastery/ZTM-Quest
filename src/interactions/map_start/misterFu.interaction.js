import { displayDialogueWithCharacter } from '../../utils';
import { npcInteractionHandler } from '../handler.interactions.js';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    player.onCollide('misterFu', () => {
        player.isInDialog = true;

        //Handling NPC Interactions
        npcInteractionHandler(player, misterFu.name, k, () => {
            displayDialogueWithCharacter({
                k,
                player,
                characterName: misterFu.name,
                text: conversationMisterFu,
                onDisplayEnd: () => {
                    player.isInDialog = false;
                    player.state.hasTalkedToMisterFu = true;
                },
            });
        });
    });
};
