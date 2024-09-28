import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k, setGlobalEvents } from '../kplayCtx';
import { stopCharacterAnims } from '../utils/animation';
import { attachInteractions } from '../interactions/map_start';
import { addGameObjects } from '../gameObjects/map_start';

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

  /**
   * Setup/Registration of global events which will be triggered in current game/map context
   */
  setGlobalEvents(() => {
    k.onUpdate(() => {
      k.camPos(player.pos.x, player.pos.y + 100);

    });

    k.onMouseDown((mouseBtn) => {
      if (mouseBtn !== 'left' || player.isInDialog) return;

      const worldMousePos = k.toWorld(k.mousePos());
      player.moveTo(worldMousePos, player.speed);


      const mouseAngle = player.pos.angle(worldMousePos);

      const lowerBound = 50;
      const upperBound = 125;

      if (mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== 'walk-up') {
        player.play('walk-up');
        player.direction = 'up';
        return;
      }

      if (mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== 'walk-down') {
        player.play('walk-down');
        player.direction = 'down';
        return;
      }

      if (Math.abs(mouseAngle) > upperBound) {
        player.flipX = false;
        if (player.curAnim() !== "walk-side") player.play("walk-side");
        player.direction = "right";
        return;
      }

      if (Math.abs(mouseAngle) < lowerBound) {
        player.flipX = true;
        if (player.curAnim() !== "walk-side") player.play("walk-side");
        player.direction = "left";
        return;
      }

    });
    k.onMouseRelease(() => stopCharacterAnims(player));
  });

})