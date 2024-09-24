import { scaleFactor } from '../constants';
import { makePlayer } from '../factories/player.factory';
import { initPlayerInteractions } from '../interactions/map_start';
import { k, setGlobalEvents } from '../kplayCtx';
import { setCamScale } from '../utils';
import { stopCharacterAnims } from '../utils/animation';

k.scene('city', async () => {

  k.loadSprite('map', './exports/maps/map_city.png');
  k.setBackground(k.Color.fromHex('#311047'));
  setCamScale(k);

  const mapData = await (await fetch('./maps/map_city.json')).json();
  const { layers } = mapData;

  const map = k.add([k.sprite('map'), k.pos(0), k.scale(scaleFactor)]);

  const player = makePlayer({

  }, 3.5);

  k.add(player);

  stopCharacterAnims(player);

  for (const layer of layers) {
    if (layer.name === 'boundaries') {
      for (const boundary of layer.objects) {
        /**
         * Setup start to create hidden boundaries for the player to collide with on the map
         * The data gets loaded from map_start.json file which in fact got created by Tiled
         */
        map.add([
          k.area({
            /**
             * The shape of the boundary which has the dimensions from Tiled map, pos x and y got figured out
             * by try/fail method to match the boundaries on the map
            */
            shape: new k.Rect(k.vec2(0, 0), boundary.width, boundary.height)
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name
        ]);
      }
      continue;
    }

    /**
     * Spawnpoints are used to place entities in the map, in this case the main game character
     * here we set the player position on start once the map object got parsed
     */
    if (layer.name === 'spawnpoints') {
      for (const entity of layer.objects) {
        if (entity.name === 'player') {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          continue;
        }
      }
    }
  }

  initPlayerInteractions(player, k);

  /**
   * Setup/Registration of global events which will be triggered in current game/map context
   */
  setGlobalEvents(() => {
    k.onResize(() => {
      setCamScale(k);
    });

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


});