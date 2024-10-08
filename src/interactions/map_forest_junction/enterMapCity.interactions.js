import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        enterMap('./scenes/city', 'city', 'spawn_top');
    });
};
