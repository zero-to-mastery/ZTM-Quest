import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { attachInteractions } from '../interactions/map_start';
import { addGameObjects } from '../gameObjects/map_start';
import { addPlayerControls } from '../player.controls';

k.scene('start', async () => {

  const objectConfig = {
    static: ['map_boundaries', 'building_boundaries', 'chairs', 'enter_new_map_boundaries'],
    spawnpoints: ['spawnpoints'],
    interactionObjects: ['interaction_objects']
  };
  const [map, spawnpoint] = await initMap(
    k,
    objectConfig,
    './exports/maps/map_start.png',
    './maps/map_start.json',
    k.vec2(0, 11)
  );

  const player = makePlayer({
    hasTalkedToBruno: false,
    wasInRestroom: false,
    hasHandsWashed: false,
  });

  player.pos = spawnpoint.player;

  k.add(map);
  k.add(player);

  addGameObjects(k, map, spawnpoint).forEach(obj => k.add(obj));
  attachInteractions(player, k);

  addPlayerControls(k, player);

})