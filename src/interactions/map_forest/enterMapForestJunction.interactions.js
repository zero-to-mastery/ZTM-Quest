import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        enterMap('./scenes/forest_junction', 'forest_junction', 'spawn_topt');
    });
};
