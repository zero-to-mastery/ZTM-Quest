export const enterMapForestInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        import('../../scenes/forest').then((_) => {
            k.go('forest', 'spawn_bottom');
        });
    });
};
