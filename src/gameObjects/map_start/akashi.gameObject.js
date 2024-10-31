import { scaleFactor } from '../../constants';

export const akashi = (k, map, spawnpoints) => {
    k.loadSprite('akashi', './assets/sprites/akashi.png', {
        sliceX: 9,
        sliceY: 1,
        anims: {
            'idle-down': 0,
            'walk-down': { from: 3, to: 4, loop: true, speed: 4 },
            'idle-side': 2,
            'walk-side': { from: 7, to: 8, loop: true, speed: 4 },
            'idle-up': 1,
            'walk-up': { from: 5, to: 6, loop: true, speed: 4 },
        },
    });

    const spawnX = spawnpoints.bruno.x / scaleFactor;
    const spawnY = spawnpoints.bruno.y / scaleFactor;
    
    const oppositeX = map.width - spawnX;
    const oppositeY = map.height - spawnY;

    const akashiObj = k.make([
        k.sprite('akashi', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(spawnX, spawnY),
        k.scale(1.1),
        k.offscreen({ hide: true, distance: 10 }),
        'akashi',
    ]);

    akashiObj.moveTo(k.vec2(oppositeX, oppositeY), 50);

    return akashiObj;
};
