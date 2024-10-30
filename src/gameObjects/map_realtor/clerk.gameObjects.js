import { scaleFactor } from '../../constants';

export const clerk = (k, map, spawnpoints) => {
    k.loadSprite('clerk', './assets/sprites/characters.png', {
        sliceX: 10,
        sliceY: 20,
        anims: {
            'idle-down': 160,
            'walk-down': { from: 184, to: 185, loop: true, speed: 4 },
            'idle-side': 52,
            'walk-side': { from: 188, to: 190, loop: true, speed: 4 },
            'idle-up': 181,
            'walk-up': { from: 186, to: 199, loop: true, speed: 4 },
        },
    });

    return k.make([
        k.sprite('clerk', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + spawnpoints.clerk.x / scaleFactor,
            map.pos.y + spawnpoints.clerk.y / scaleFactor
        ),
        k.offscreen({ hide: true, distance: 10 }),
        'clerk',
    ]);
};
