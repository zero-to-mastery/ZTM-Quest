import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const controllerInteraction = (player, k) => {
    interactionHandler(player, 'controller', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'You see an old retro game controller, and miss the days of the N64',
            ],
        });
    });
};
