import { displayDialogue } from '../../utils';

export const initPlayerInteractions = (player, k) => {

  player.onCollide('enter_map_arcade', () => {
    k.go('arcade');
  });
}