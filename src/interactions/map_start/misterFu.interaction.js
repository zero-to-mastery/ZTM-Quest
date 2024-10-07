import { displayDialogue } from '../../utils';
import { npcInteractionHandler } from '../handler.interactions';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    player.onCollide('misterFu', () => {
        npcInteractionHandler(player, misterFu.name, k, () => {
            player.isInDialog = true;
            displayDialogue({
                k,
                player,
                characterName: misterFu.name,
                test: conversationMisterFu,
                onDisplayEnd: () => {
                    player.isInDialog = false;
                    player.state.hasTalkedToMisterFu = true;
                },
            });
        });
    });
};
