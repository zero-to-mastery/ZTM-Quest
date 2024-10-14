export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        k.go('forest_junction', 'spawn_bottom');
    });
};
