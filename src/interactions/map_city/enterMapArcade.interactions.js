export const enterMapArcadeInteraction = (player, k) => {
    player.onCollide('enter_map_arcade', () => {
        import('../../scenes/arcade').then((_) => {
            k.go('arcade');
        });
    });

    player.onCollide('enter_map_start_right', () => {
        import('../../scenes/start').then((_) => {
            k.go('start');
        });
    });
};
