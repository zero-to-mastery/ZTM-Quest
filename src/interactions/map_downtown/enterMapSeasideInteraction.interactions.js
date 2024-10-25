export const enterMapSeasideInteraction = (player, k) => {
    player.onCollide('enter_map_seaside', () => {
        k.go('seaside', 'spawn_downtown');
    });
};
