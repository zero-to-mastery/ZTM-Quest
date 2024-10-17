export const enterMapArcadeInteraction = (player, k) => {
    player.onCollide('enter_map_arcade', () => {
        k.go('arcade');
    });
};
