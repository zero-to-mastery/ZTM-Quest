export const enterMapExtendedCampusTop = (player, k) => {
    player.onCollide('enter_map_right', () => {
        k.go('extended_campus', 'spawn_extended_campus_top');
    });
};
