import { enterMap } from '../../core/kaplay/game/scene';

export const enterMapForestInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        enterMap('./scenes/forest', 'foresst', 'spawn_bottom');
    });
};
