import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const churchDialogue = [
    'Pray to the God and adapting is the key',
];

export const interactionWithChurch = (player, k, map) => {
    interactionHandler(player, 'church', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'church',
            text: churchDialogue,
        });
    });
};
