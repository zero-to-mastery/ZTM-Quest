export const enterMapCompanyInteriorInteraction = (player, k) => {
    player.onCollide('enter_map_downtown', () => {
        k.go('downtown');
    });
};
