import {displayDialogueWithCharacter} from '../../utils'

import { conversationMisterFu, misterFu } from '../../constants';


export const interactionWithMisterFu =(player, k, map) => {
    player.onCollide('misterFu', () => {
        player.isInDialog = true;
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
    });
}