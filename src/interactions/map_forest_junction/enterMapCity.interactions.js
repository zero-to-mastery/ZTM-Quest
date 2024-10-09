import { cityScene } from '../../scenes/city';

export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        cityScene({ k, enter_tag: 'spawn_top' });
    });
};
