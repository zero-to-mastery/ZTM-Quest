export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_bottom', () => {
        import('../../scenes/city').then((_) => {
            k.go('city');
        });
    });
};
