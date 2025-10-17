import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const interactionWithFlashDrive = (player, k, map) => {
  interactionHandler(player, 'flashDrive', k, () => {
    displayDialogue({
      k,
      player,
      characterName: 'flashDrive',
      text: ["You found a flash drive in the the forest. You wonder who it might belong to?"]
    });
  });
};
