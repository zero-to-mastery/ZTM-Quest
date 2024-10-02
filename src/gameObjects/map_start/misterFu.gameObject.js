import { scaleFactor } from '../../constants';

export const misterFu = (k, map, spawnpoints) => {
    k.loadSprite('misterFu', './misterFu.png', {
        sliceX: 9,
        sliceY: 1,
        anims: {
            'idle-down': 0,
            'walk-down': { from: 3, to: 4, loop: true, speed: 4 },
            'idle-side': 2,
            'walk-side': { from: 7, to: 8, loop: true, speed: 4 },
            'idle-up': 1,
            'walk-up': { from: 5, to: 26, loop: true, speed: 4 },
        },
    });

    const misterFuObj = k.make([
        k.sprite('misterFu', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + spawnpoints.misterFu.x,
            map.pos.y + spawnpoints.misterFu.y
        ),
        k.scale(scaleFactor + 0.5),
        'misterFu',
    ]);

    return misterFuObj;
};
