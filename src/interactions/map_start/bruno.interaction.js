import { displayDialogue } from '../../utils';
import { conversationBruno } from '../../constants';

export const interactionWithBruno = (player, k, map) => {
  player.onCollide('bruno', () => {
    player.isInDialog = true;
    displayDialogue(conversationBruno, () => {
      player.isInDialog = false
      player.hasTalkedToBruno = true;
    });
  });
}