export const enterMapExtendedCampus = (player, k) => {
    player.onCollide('enter_map_extended_campus', () => {
        k.go('extended_campus', 'spawn_house');
    });
};
