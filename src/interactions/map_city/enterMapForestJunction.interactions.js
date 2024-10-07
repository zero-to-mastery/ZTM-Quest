export const enterMapForestJunctionInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        import('../../scenes/forest_junction').then((_) => {
            k.go('forest_junction', 'spawn_bottom');
        });
    });
};
