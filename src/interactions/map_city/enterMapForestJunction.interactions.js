import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        enterMap('./scenes/forest_junction', 'forest_junction', 'spawn_bottom');
    });
};
