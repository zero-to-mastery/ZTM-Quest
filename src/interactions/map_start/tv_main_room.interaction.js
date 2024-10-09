import { displayDialogue } from '../../utils';

export const interactionWithTV = (player, k, map) => {
    const [tv_video] = map.query({ include: 'tv_video' });
    tv_video.hidden = true;

    player.onCollide('tv_main_room', () => {
        player.isInDialog = true;

        const scaleFactor = tv_video.turnedOff ? 0 : 0.7;

        tv_video.scaleTo(scaleFactor);

        displayDialogue({
            k,
            player,
            text: tv_video.turnedOff ? ['Tv Turned Off'] : ['Tv Turned On'],
            onDisplayEnd: () => {
                player.isInDialog = false;
                tv_video.turnedOff = !tv_video.turnedOff;
            },
        });
    });
};
