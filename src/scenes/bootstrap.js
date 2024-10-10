import { makePlayer } from '../factories/player.factory';
import { k } from '../kplayCtx';
import { getGameState } from '../utils/gameState';
import { addPlayerControls } from './../player.controls';

export async function bootstrap(bootMapCb, mapArgs) {

  const gameState = getGameState();
  const player = makePlayer(gameState.player);

  const [map, spawnpoint, addGameObjects, attachInteractions] = await bootMapCb();

  player.pos = (mapArgs?.enter_tag && spawnpoint[mapArgs?.enter_tag]) || spawnpoint.player;

  k.add(map);
  k.add(player);
  k.canvas.focus();

  addPlayerControls(player);
  addGameObjects(map, spawnpoint).forEach((obj) => k.add(obj));
  attachInteractions('player');
}
