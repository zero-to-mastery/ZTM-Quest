import { scaleFactor } from '../../constants';

export const bruno = (k, map, spawnpoints) => {
    k.loadSprite('bruno', './assets/sprites/bruno.png', {
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

    const brunoObj = k.make([
        k.sprite('bruno', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos((spawnpoints.bruno.x / scaleFactor), (spawnpoints.bruno.y / scaleFactor)),
        k.scale(1.1),
        'bruno',
    ]);

    return brunoObj;
};
