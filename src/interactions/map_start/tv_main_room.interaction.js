import { displayDialogue } from '../../utils';

export const interactionWithTV = (player, k, map) => {
    const [tv_video] = k.query({ include: 'tv_video' });
    tv_video.hidden = true;
    player.onCollide('tv_main_room', () => {
        player.isInDialog = true;
        tv_video.hidden = !tv_video.hidden;
        displayDialogue({
            k,
            player,
            text: tv_video.hidden ? ['Tv Turned Off'] : ['Tv Turned On'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
