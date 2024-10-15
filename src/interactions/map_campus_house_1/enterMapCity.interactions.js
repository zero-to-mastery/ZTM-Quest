export const enterMapCityInteraction = (player, k) => {
    player.onCollide('enter_map_bottom', () => {
        //currently set to spawn back to the campus entrance as there is no house spawn yet.
        k.go('city', 'spawn_campus_house_1');
    });
};
