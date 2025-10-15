import { scaleFactor } from '../../constants';

const characterRow = 17;
const sliceX = 10;
const sliceY = 20;
const spritePosition = (characterRow - 1) * sliceX;

export const jessica = (k, map, spawnpoints) => {
  k.loadSprite('jessica', './assets/sprites/characters.png', {
    sliceX: sliceX,
    sliceY: sliceY,
    anims: {
      'idle-down': spritePosition + 0,
      'walk-down': { from: spritePosition + 5, to: spritePosition + 6, loop: true, speed: 4 },
      'idle-up': spritePosition + 1,
      'walk-up': { from: spritePosition + 7, to: spritePosition + 8, loop: true, speed: 4 },
      'idle-right': spritePosition + 2,
    },
  });

  const jessicaObj = k.make([
    k.sprite('jessica', { anim: 'idle-down' }),
    k.area({
      shape: new k.Rect(k.vec2(0), 16, 16),
    }),
    k.body({ isStatic: true }),
    k.anchor('center'),
    k.pos(390, 520),
    k.scale(scaleFactor * 0.5),
    k.offscreen({ hide: true, distance: 10 }),
    'jessica',
  ]);

  return jessicaObj;
};
