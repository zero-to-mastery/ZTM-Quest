import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const jessicaInteraction = (player, k) => {
  interactionHandler(player, 'jessica', k, async () => {
    await displayDialogue({
      k,
      player,
      characterName: 'Jessica',
      text: [
        "Hi, I'm Jessica! I'm learning Javascript! It's a lot of work, but I'm excited to get better at it."
      ],
    });
  });
};
