import { scaleFactor } from '../../constants';

export const misterFu = (k, map, spawnpoints) => {
    k.loadSprite('misterFu', './assets/sprites/characters.png', {
        sliceX: 10,
        sliceY: 20,
        anims: {
            'idle-down': 60,
            'walk-down': { from: 64, to: 65, loop: true, speed: 4 },
            'idle-side': 62,
            'walk-side': { from: 68, to: 69, loop: true, speed: 4 },
            'idle-up': 61,
            'walk-up': { from: 66, to: 76, loop: true, speed: 4 },
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
            (spawnpoints.player.x / scaleFactor) + 40,
            spawnpoints.player.y / scaleFactor
        ),
        'misterFu',
    ]);

    return misterFuObj;
};
