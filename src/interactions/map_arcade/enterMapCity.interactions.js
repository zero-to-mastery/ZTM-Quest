export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_bottom', () => {
        enterMap('./scenes/city', 'city', 'spawn_arcade');
    });
};
