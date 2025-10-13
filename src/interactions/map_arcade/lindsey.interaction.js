import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationRico, rico } from '../../constants';

export const interactionWithRico = (player, k, map) => {
    interactionHandler(player, rico.name, k, () => {
        displayDialogue({
            k,
            player,
            characterName: rico.name,
            text: conversationRico[
                Math.floor(Math.random() * conversationRico.length)
            ],
            onDisplayEnd: () => {
                player.state.hasTalkedToRico = true;
            },
        });
    });
};
