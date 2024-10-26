import { displayPermissionBox } from '../../utils';
export const enterMapStartRightInteraction = (player, k) => {
    player.onCollide('enter_map_start_right', async () => {
        let granted = await displayPermissionBox({
            k,
            player,
            text: [
                'You are about to go back to the start. Are you sure you want to proceed?',
            ],
        });
        if (granted) {
            k.go('start', 'spawn_right');
        }
    });
};
