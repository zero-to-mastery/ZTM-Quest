import { scaleFactor } from '../constants';
import { makeNpc } from '../factories/npc.factory';
import { makePlayer } from '../factories/player.factory';
import { initPlayerInteractions } from '../interactions/map_start';
import { k, setGlobalEvents } from '../kplayCtx';
import { setCamScale } from '../utils';
import { stopCharacterAnims } from '../utils/animation';


k.scene('start', async () => {

  // Local sprite loaded from the public folder which is available in the current map
  k.loadSprite('ztmTrailer', './ztm_trailer.png', {
    sliceX: 3,
    sliceY: 1,
    anims: {
      'idle': { from: 0, to: 1, loop: false },
      'run': { from: 0, to: 2, loop: true, speed: 1 }
    }
  })

  k.loadSprite('bruno', './bruno.png', {
    sliceX: 9,
    sliceY: 1,
    anims: {
      'idle-down': 0,
      'walk-down': { from: 3, to: 4, loop: true, speed: 4 },
      'idle-side': 2,
      'walk-side': { from: 7, to: 8, loop: true, speed: 4 },
      'idle-up': 1,
      'walk-up': { from: 5, to: 26, loop: true, speed: 4 },
    }
  });

  k.loadSprite('map', './exports/maps/map_start.png');
  k.setBackground(k.Color.fromHex('#311047'));
  setCamScale(k);


  const mapData = await (await fetch('./maps/map_start.json')).json();
  const { layers } = mapData;

  const map = k.add([k.sprite('map'), k.pos(0), k.scale(scaleFactor), 'map_container']);

  const player = makePlayer({
    hasTalkedToBruno: false,
    wasInRestroom: false,
    hasHandsWashed: false,
  });

  k.add(player);

  stopCharacterAnims(player);


  // Loop over all layers to setup the map
  for (const layer of layers) {

    if (layer.name === 'chairs') {
      for (const chair of layer.objects) {
        let direction = 'idle-side';

        if (chair.properties && chair.properties.length) {
          const directionProp = chair.properties.find(prop => prop.name === 'direction');
          direction = directionProp.value;
        }

        // createa npc for each chair
        const npc = makeNpc(
          chair.name,
          k.vec2(
            (map.pos.x + chair.x + 6) * scaleFactor,
            (map.pos.y + chair.y + 12) * scaleFactor
          ),
          'idle-side',
          'map_start'
        );

        k.add(npc);

        if (direction === 'left') {
          npc.flipX = true;
        }

        k.wait(1, () => {
          npc.enterState('idle');
        })
      }
    }
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
            shape: new k.Rect(k.vec2(1, 10), boundary.width, boundary.height)
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
          'map_start'
        ]);

        if (boundary.name === 'monitor_lobby') {
          const ztmTrailer = map.add([
            k.sprite('ztmTrailer'),
            k.area({
              shape: new k.Rect(k.vec2(0, 0), boundary.width + 5, boundary.height)
            }),
            k.body(),
            k.pos(boundary.x + 2, boundary.y + 11),
            k.scale(0.8),
            k.body({ isStatic: true }),
            boundary.name,
            'map_start'
          ]);
          ztmTrailer.play('run');
        }
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

        if (entity.name === 'bruno') {

          k.add([
            k.sprite('bruno', { anim: 'idle-down' }),
            k.area({
              shape: new k.Rect(k.vec2(0), 16, 16)
            }),
            k.body({ isStatic: true }),
            k.anchor('center'),
            k.pos((map.pos.x + entity.x) * scaleFactor, (map.pos.y + entity.y) * scaleFactor),
            k.scale(scaleFactor + 1),
            'bruno',
            'map_start'
          ]);
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

})