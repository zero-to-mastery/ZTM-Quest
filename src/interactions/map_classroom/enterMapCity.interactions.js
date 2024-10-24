export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_city', () => {
        k.go('city', 'spawn_classroom');
    });
};
