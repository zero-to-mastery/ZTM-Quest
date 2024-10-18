import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const dialogue = [
    'Why is this teacher so obsessed with Bob Ross?',
    "Actually, isn't this a programming class?",
];

export const bobRossInteraction = (player, k, map) => {
    interactionHandler(player, 'bobross', k, async () => {
        player.isInDialogue = true;
        await displayDialogue({
            k,
            player,
            characterName: 'Your inner thoughts',
            text: dialogue,
            onDisplayEnd: () => {
                player.isInDialogue = false;
            },
        });
    });
};
