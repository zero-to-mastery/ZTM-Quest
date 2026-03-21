export const enterMapGraveyardInteraction = (player, k, map) => {
   player.onCollide('enter_map_graveyard', () => {
    k.go('graveyard', 'spawn_bottom');
   });
};



