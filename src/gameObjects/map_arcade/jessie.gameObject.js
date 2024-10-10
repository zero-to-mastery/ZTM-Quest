import { scaleFactor } from '../../constants';

export const jessie = (k, map, spawnpoints) => {
    k.loadSprite('jessie', './assets/sprites/characters.png', {
        sliceX: 10,
        sliceY: 20,
        anims: {
            'idle-down': 180,
            'walk-down': { from: 184, to: 185, loop: true, speed: 4 },
            'idle-side': 182,
            'walk-side': { from: 188, to: 190, loop: true, speed: 4 },
            'idle-up': 181,
            'walk-up': { from: 186, to: 199, loop: true, speed: 4 },
        },
    });

    const jessieObj = k.make([
        k.sprite('jessie', { anim: 'idle-side' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + spawnpoints.player.x / scaleFactor - 60,
            map.pos.y + spawnpoints.player.y / scaleFactor - 20
        ),
        k.offscreen({ hide: true, distance: 10 }),
        'jessie',
    ]);

    return jessieObj;
};
