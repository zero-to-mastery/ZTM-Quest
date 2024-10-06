import { displayDialogue } from '../../utils';

import { npcInteractionHandler } from '../handler.interactions';

import { conversationJessie, jessie } from '../../constants';

export const interactionWithJessie = (player, k, map) => {
    player.onCollide('jessie', () => {
        player.isInDialog = true;

        npcInteractionHandler(player, jessie.name, k, () => {
            displayDialogue({
                k,
                player,
                characterName: jessie.name,
                text: conversationJessie,
                onDisplayEnd: () => {
                    player.isInDialog = false;
                    player.state.hasTalkedToJessie = true;
                },
            });
        });
    });
};
