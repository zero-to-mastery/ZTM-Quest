import { displayDialogue } from '../../utils';
import { interactionHandler } from '../utils/handler.interactions';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    interactionHandler(player, misterFu.name, k, () => {
        player.isInDialog = true;
        displayDialogue({
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
};
