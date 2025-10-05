import { displayDialogue } from "../../utils";

export const interactionWithTrashBin = (player, k, map) => {
  player.onCollide('trash_bin_lobby', () => {

      displayDialogue({
          k,
          player,
          text: ['<p>Nothing special here... Just wasted items. </p>']
      })
  });
};
