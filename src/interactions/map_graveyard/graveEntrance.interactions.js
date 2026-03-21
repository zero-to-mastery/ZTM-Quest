import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const graveEntranceDialogue = [
    'Here lies a developer who believed they were irreplaceable, until AI proved otherwise.',
];

export const interactionWithGraveEntrance = (player, k, map) => {
    interactionHandler(player, 'grave_entrance', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'grave_entrance',
            text: graveEntranceDialogue,
        });
    });
};
