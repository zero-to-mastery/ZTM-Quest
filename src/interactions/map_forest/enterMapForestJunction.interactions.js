import { forestJunctionScene } from '../../scenes/forest_junction';

export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        forestJunctionScene({ k, enter_tag: 'spawn_top' });
    });
};
