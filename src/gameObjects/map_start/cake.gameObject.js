export const cake = (k, map, spawnpoints) => {
    k.loadSprite('cake', './assets/sprites/cake.png');

    const cakeSpawnX = 60;
    const cakeSpawnY = 60;

    const cakeObj = k.make([
        k.sprite('cake'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + cakeSpawnX, map.pos.y + cakeSpawnY),
        k.scale(0.9),
        k.offscreen({ hide: true, distance: 10 }),
        'cake',
    ]);

    return cakeObj;
};
