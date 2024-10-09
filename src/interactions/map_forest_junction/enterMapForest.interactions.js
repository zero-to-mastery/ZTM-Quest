import { forestScene } from '../../scenes/forest';

export const enterMapForestInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        forestScene({ k, enter_tag: 'spawn_bottom' });
    });
};
