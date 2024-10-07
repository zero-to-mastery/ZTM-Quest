import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

const shrubDialogue = [
    'The shrub is dense and thorny, its dark green leaves glistening with dew. Small berries hang from its branches, half-hidden beneath the thick foliage.',
];

export const interactionWithShrub = (player, k, map) => {
    interactionHandler(player, 'shrub', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'shrub',
            text: shrubDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
