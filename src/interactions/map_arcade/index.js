import { initPlayerInteractions } from './player.interactions';

const interaction = [initPlayerInteractions];

export const attachInteractions = (gameObj, k) => {
  const map = k.get('main_map')[0];

  interaction.forEach((cb) => cb(gameObj, k, map));
}
