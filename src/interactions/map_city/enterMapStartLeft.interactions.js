import { enterMap } from '../../core/kaplay/game/scene';
import { displayPermissionBox } from '../../utils';
export const enterMapStartLeftInteraction = (player, k, map) => {
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
            enterMap('./scenes/start', 'start', 'spawn_left');
        }
    });
};
