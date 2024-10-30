import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const treeSignInteraction = (player, k) => {
    interactionHandler(player, 'tree_sign', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'These trees were planted by students, each one a symbol of growth, resilience, and hope for the future.',
                'May they stand tall and strong, shading those who come after.',
            ],
        });
    });
};
