export const enterMapCampusHouse1Interaction = (player, k) => {
    player.onCollide('campus_house_door_1', () => {
        k.go('campus_house_1');
    });
};
