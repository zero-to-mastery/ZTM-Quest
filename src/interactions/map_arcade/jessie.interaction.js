import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';
import { conversationJessie, jessie } from '../../constants';

export const interactionWithJessie = (player, k, map) => {
    interactionHandler(player, jessie.name, k, () => {
        player.isInDialog = true;
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
};
