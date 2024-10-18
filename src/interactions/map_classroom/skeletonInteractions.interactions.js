import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const dialogue = [
    "This is how you're going to look when you know every programming language available",
    'In every language!',
    'Every framework',
    '...',
    'Then your bones start to crack',
];

export const skeletonInteractions = (player, k, map) => {
    interactionHandler(player, 'skeleton', k, () => {
        player.isInDialogue = true;
        displayDialogue({
            k,
            player,
            characterName: 'Skeleton',
            text: dialogue,
            onDisplayEnd: () => {
                player.isInDialogue = false;
            },
        });
    });
};
