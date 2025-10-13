export const enterMapCompanyInterior = (player, k) => {
    player.onCollide('enter_map_company_d', () => {
        k.go('company_interior');
    });
};
