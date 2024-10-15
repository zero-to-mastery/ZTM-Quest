import { displayPermissionBox } from '../../utils';
export const enterMapStartRightInteraction = (player, k) => {
    player.onCollide('enter_map_start_right', async () => {
        player.isInDialog = true;
        let granted = await displayPermissionBox({
            k,
            player,
            text: [
                'You are about to go back to the start. Are you sure you want to proceed?',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
        // console.log(granted);
        if (granted) {
            k.go('start', 'spawn_right');
        }
    });
};
