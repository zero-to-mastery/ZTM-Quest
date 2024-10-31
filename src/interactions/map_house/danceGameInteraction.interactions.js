import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const danceGameInteraction = (player, k) => {
    interactionHandler(player, 'dance_game', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'The screen displays a pixelated dancer doing incredible moves',
            ],
        });
    });
};
