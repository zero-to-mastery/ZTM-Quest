export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_bottom', () => {
        k.go('city', 'spawn_arcade');
    });
};
