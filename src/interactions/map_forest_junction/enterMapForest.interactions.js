export const enterMapForestInteraction = (player, k, map) => {
    player.onCollide('enter_map_top', () => {
        k.go('forest', 'spawn_bottom');
    });
};
