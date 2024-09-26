import { displayDialogue } from '../../utils';

export const initPlayerInteractions = (player, k) => {

  player.onCollide('enter_map_bottom', () => {
    k.go('city');
  });
}