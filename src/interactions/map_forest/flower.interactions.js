import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const flowerDialogue = [
    "The delicate petals are bright and vibrant, standing in stark contrast to the earth around it. A soft fragrance drifts from the bloom, bringing a sense of calm and serenity."
];

export const interactionWithFlower = (player, k, map) => {
    interactionHandler(player, 'flower', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'flower',
            text: flowerDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
