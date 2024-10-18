import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const treeDialogue = [
    "The tree's bark is rough to the touch, grooves etched deep into its surface. You notice some carvings—initials of people who must have visited here long ago.",
];

export const interactionWithTree = (player, k, map) => {
    interactionHandler(player, 'tree', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'tree',
            text: treeDialogue,
        });
    });
};
