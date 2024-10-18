import { displayDialogue } from '../../utils';

export const interactionWithTV = (player, k, map) => {
    const [tv_video] = map.query({ include: 'tv_video' });
    tv_video.hidden = true;
    player.onCollide('tv_main_room', () => {
        tv_video.hidden = !tv_video.hidden;
        displayDialogue({
            k,
            player,
            text: tv_video.hidden ? ['Tv Turned Off'] : ['Tv Turned On'],
        });
    });
};
