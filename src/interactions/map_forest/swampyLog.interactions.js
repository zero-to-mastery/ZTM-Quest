import { displayDialogue } from '../../utils';
import { interactionHandler } from '../utils/handler.interactions';

const swampyLogDialogue = [
    'The log is slick with moss and half-sunken into the murky water. A few small insects skitter across its surface, disappearing into the dark, wet bark.',
];

export const interactionWithSwampyLog = (player, k, map) => {
    interactionHandler(player, 'swampy_log', k, () => {
        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            characterName: 'swampy_log',
            text: swampyLogDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
