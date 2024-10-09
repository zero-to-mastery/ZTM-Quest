import { cityScene } from '../../scenes/city';

export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_bottom', () => {
        cityScene({ k, enter_tag: 'spawn_campus_house_1' });
    });
};
