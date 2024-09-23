import { conversationBruno } from '../constants';
import { displayDialogue } from '../utils';

export const initPlayerInteractions = (player, k) => {

  player.onCollide('bruno', () => {
    player.isInDialog = true;
    displayDialogue(conversationBruno, () => {
      player.isInDialog = false
      player.hasTalkedToBruno = true;
    });
  });

  player.onCollide('enter_map_2', () => {
    if (player.hasTalkedToBruno && player.wasInRestroom && player.hasHandsWashed) {
      k.go('city');
    } else {
      if (!player.hasTalkedToBruno) {
        player.isInDialog = true;
        displayDialogue([
          "You should talk to Bruno first.",
          "He is the guy with the beautiful suite to your left side."
        ], () => { player.isInDialog = false });

        return;
      } else {
        if (!player.wasInRestroom) {
          player.isInDialog = true;
          displayDialogue([
            "You should visit the restroom first.",
            "Remember what bruno said? It will be a long journey.",
            "Don't forget to wash your hands."
          ], () => { player.isInDialog = false });
          return;
        }

        if (!player.hasHandsWashed) {
          player.isInDialog = true;
          displayDialogue([
            "You should wash your hands first.",
          ], () => { player.isInDialog = false });
        }
      }

    }
  });

  player.onCollide('restroom_toilet', () => {
    player.wasInRestroom = true;
    player.isInDialog = true;
    const dialog = [
      "You feel refreshed now.",
      "Ready for the ride."
    ];

    if (!player.hasTalkedToBruno) {
      dialog.push("You should talk to Bruno first.");
    }
    displayDialogue(dialog, () => { player.isInDialog = false });
  });

  player.onCollide('restroom_sink', () => {
    player.isInDialog = true;
    displayDialogue([
      "You washed your hands. Good job!"
    ], () => {
      player.hasHandsWashed = true;
      player.isInDialog = false;
    });
  });
}