import { displayPermissionBox } from '../../utils';
export const enterMapStartInteraction = (player, k) => {
    player.onCollide('enter_map_start', async () => {
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
            import('../../scenes/start').then((_) => {
                k.go('start', 'enter_city');
            });
        }
    });
};
