import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationJessie, jessie } from '../../constants';

export const interactionWithJessie = (player, k, map) => {
    interactionHandler(player, jessie.name, k, () => {
        displayDialogue({
            k,
            player,
            characterName: jessie.name,
            text: conversationJessie,
            onDisplayEnd: () => {
                player.state.hasTalkedToJessie = true;
            },
        });
    });
};
