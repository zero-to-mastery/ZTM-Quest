export const enterMapSeasideInteraction = (player, k) => {
    player.onCollide('enter_map_left', () => {
        k.go('seaside');
    });
};
