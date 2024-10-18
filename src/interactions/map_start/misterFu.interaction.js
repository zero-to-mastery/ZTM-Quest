import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    interactionHandler(player, misterFu.name, k, () => {
        displayDialogue({
            k,
            player,
            characterName: misterFu.name,
            text: conversationMisterFu,
            onDisplayEnd: () => {
                player.state.hasTalkedToMisterFu = true;
            },
        });
    });
};
