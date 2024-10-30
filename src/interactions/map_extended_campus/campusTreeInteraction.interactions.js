import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const campusTreeInteraction = (player, k) => {
    interactionHandler(player, 'campus_tree', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'The tree seems to emit a faint glow. There are carvings on its trunk, suggesting that students from years past have left messages or markings here.',
            ],
        });
    });
};
