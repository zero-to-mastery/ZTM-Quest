import { scaleFactor } from '../../constants';

export const bag = (k, map, spawnpoints) => {
    k.loadSprite('bag', './assets/sprites/bag.png', {
        anims: {
            'idle-down': 0,
        },
    });

    const bagObj = k.make([
        k.sprite('bag', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + spawnpoints.bag.x, map.pos.y + spawnpoints.bag.y),
        k.scale(scaleFactor + 0.5),
        'bag',
    ]);

    return bagObj;
};
