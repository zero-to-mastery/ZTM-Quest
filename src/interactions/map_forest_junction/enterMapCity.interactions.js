export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        k.go('city', 'spawn_top');
    });
};
