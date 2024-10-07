export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_bottom', () => {
        import('../../scenes/city').then((_) => {
            k.go('city', 'spawn_top');
        });
    });
};
