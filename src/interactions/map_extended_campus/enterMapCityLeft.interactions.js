export const enterMapCityLeft = (player, k) => {
    player.onCollide('enter_map_city', () => {
        k.go('city', 'spawn_extended_campus');
    });
};
