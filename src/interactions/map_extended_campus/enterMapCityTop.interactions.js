export const enterMapCityTop = (player, k) => {
    player.onCollide('enter_map_city_top', () => {
        k.go('city', 'spawn_right');
    });
};
