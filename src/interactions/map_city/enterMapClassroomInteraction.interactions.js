export const enterMapClassroomInteraction = (player, k) => {
    player.onCollide('enter_map_classroom', () => {
        k.go('classroom');
    });
};
