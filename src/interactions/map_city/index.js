import { enterMapArcadeInteraction } from './enterMapArcade.interactions';

const interaction = [
  enterMapArcadeInteraction,
];

export const attachInteractions = (gameObj, k) => {
  const map = k.get('main_map')[0];

  interaction.forEach((cb) => cb(gameObj, k, map));
}
