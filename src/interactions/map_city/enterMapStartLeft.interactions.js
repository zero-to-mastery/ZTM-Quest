import { displayPermissionBox } from '../../utils';
export const enterMapStartLeftInteraction = (player, k) => {
    player.onCollide('enter_map_start_left', async () => {
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
        if (granted) {
            import('../../scenes/start').then((_) => {
                k.go('start', 'spawn_left');
            });
        }
    });
};
