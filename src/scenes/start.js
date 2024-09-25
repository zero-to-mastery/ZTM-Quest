import { scaleFactor } from '../constants';
import { makeNpc } from '../factories/npc.factory';
import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k, setGlobalEvents } from '../kplayCtx';
import { stopCharacterAnims } from '../utils/animation';
import { attachInteractions } from '../interactions/map_start';

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

  const objectConfig = {
    static: ['map_boundaries', 'building_boundaries', 'chairs', 'enter_new_map_boundaries'],
    spawnpoints: ['spawnpoints'],
    interactionObjects: ['interaction_objects']
  };
  const [map, spawnpoint] = await initMap(k, objectConfig, './exports/maps/map_start.png', './maps/map_start.json');

  const player = makePlayer({
    hasTalkedToBruno: false,
    wasInRestroom: false,
    hasHandsWashed: false,
  });
  player.pos = spawnpoint.player;

  k.add(map);
  k.add(player);

  k.add([
    k.sprite('bruno', { anim: 'idle-down' }),
    k.area({
      shape: new k.Rect(k.vec2(0), 16, 16)
    }),
    k.body({ isStatic: true }),
    k.anchor('center'),
    k.pos((map.pos.x + spawnpoint.bruno.x), (map.pos.y + spawnpoint.bruno.y)),
    k.scale(scaleFactor + 1),
    'bruno',
    'map_start'
  ]);

  const npcStore = [];
  const chairPattern = new RegExp(/chair_/g);
  const chairs = map.get('*').filter(obj => obj.tags.filter(tag => new RegExp(chairPattern).test(tag)).length > 0);

  for (const chair of chairs) {
    let direction = 'idle-side';

    direction = chair.tiledProps.direction;

    // createa npc for each chair
    const npc = makeNpc(
      chair.name,
      k.vec2(
        (map.pos.x + chair.pos.x + 6) * scaleFactor,
        (map.pos.y + chair.pos.y + 12) * scaleFactor
      ),
      'idle-side',
      'map_start'
    );

    if (direction === 'left') {
      npc.flipX = true;
    }
    npcStore.push(npc);
  }

  k.chooseMultiple(npcStore, npcStore.length / 3).forEach(npc => k.add(npc));


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