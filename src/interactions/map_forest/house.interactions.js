import { displayDialogue } from '../../utils';
import { interactionHandler } from '../utils/handler.interactions';

const houseDialogue = [
    'The house stands in disrepair, its windows shattered and roof sagging. Vines crawl up the cracked walls, and the door hangs loosely on its hinges, creaking with the wind.',
];

export const interactionWithHouse = (player, k, map) => {
    interactionHandler(player, 'house', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'house',
            text: houseDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
