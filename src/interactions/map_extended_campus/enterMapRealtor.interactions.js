export const enterMapRealtor = (player, k) => {
    player.onCollide('enter_map_realtor_office', () => {
        k.go('realtor');
    });
};
