export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        k.go('forest_junction', 'spawn_top');
    });
};
