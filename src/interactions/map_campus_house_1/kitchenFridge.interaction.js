import { displayDialogue } from '../../utils';

const butterBeerDialog = [
  "You see a fresh mug of butterbeer in the fridge and take it. You're not thirsty at the moment, but perhaps someone else in the house might enjoy it.",
];

const emptyFridge = ['The refrigerator is now empty.'];

export const kitchenFridgeInteractions = (player, k, map) => {
  player.onCollide('kitchen_fridge', async () => {
    player.isInDialog = true;

    if (player?.state?.hasButterBeer) {
      await displayDialogue({
        k,
        player,
        text: emptyFridge,
        onDisplayEnd: () => {
          player.isInDialog = false;
        },
      });
      return;
    }

    displayDialogue({
      k,
      player,
      text: butterBeerDialog,
      onDisplayEnd: () => {
        player.state.hasButterBeer = true;
        player.isInDialog = false;
      },
    });
  });
};
