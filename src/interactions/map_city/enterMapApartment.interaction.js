export const enterMapApartmentInteraction = (player, k) => {
    player.onCollide('apartment_door_1', () => {
        import('../../scenes/apartment').then((_) => {
            k.go('apartment');
        });
    });
};
