import { interactionWithBruno } from './bruno.interaction';
import { enterMapCityInteraction } from './enterMapCity.interaction';
import { restroomInteractions } from './restroom.interactions';


const interaction = [
  restroomInteractions,
  interactionWithBruno,
  enterMapCityInteraction,
];

export const attachInteractions = (gameObj, k) => {
  const map = k.get('main_map')[0];

  interaction.forEach((cb) => cb(gameObj, k, map));
}
