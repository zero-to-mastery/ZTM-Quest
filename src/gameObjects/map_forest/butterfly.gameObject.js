import { scaleFactor } from '../../constants';

export const butterfly = (k, map, spawnpoints) => {
  k.loadSprite('butterfly', './forest_sprites.png', {
        sliceX: 16,
        sliceY: 16,
        anims: {
            'walk-side': { from: 86, to: 89, loop: true, speed: 4 },
            'idle-side': 86,
        },
    });

   return k.make([
        k.sprite('butterfly', { anim: 'idle-side' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + spawnpoints.butterfly.x, map.pos.y + spawnpoints.butterfly.y),
        k.scale(scaleFactor + 0.5),
        'butterfly',
    ]);
};