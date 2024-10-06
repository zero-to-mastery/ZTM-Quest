export const enterMapCampusHouse1Interaction = (player, k) => {
    player.onCollide('campus_house_door_1', () => {
        import('../../scenes/campus_house_1').then((_) => {
            k.go('campus_house_1');
        });
    });
};
