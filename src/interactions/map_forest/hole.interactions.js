import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const holeDialogue = [
    'The hole is wide and deep, its edges crumbling slightly into the dark void below. The air around it feels cooler, and you can’t shake the uneasy feeling that something once crawled out of it.',
];

export const interactionWithHole = (player, k, map) => {
    interactionHandler(player, 'hole', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'hole',
            text: holeDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
