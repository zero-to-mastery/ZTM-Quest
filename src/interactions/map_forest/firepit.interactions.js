import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const firepitDialogue = [
    'The fire pit is cold and filled with ash, remnants of old charred wood scattered inside. Stones circle the pit, blackened by past flames, but no sign of recent use remains.',
];

export const interactionWithFirepit = (player, k, map) => {
    interactionHandler(player, 'firepit', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'firepit',
            text: firepitDialogue,
        });
    });
};
