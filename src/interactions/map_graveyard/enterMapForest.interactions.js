export const enterMapForestInteraction = (player, k, map) => {
   player.onCollide('enter_map_forest', () => {
    k.go('forest', 'spawn_topleft');
   });
};



