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
        k.pos(cakeSpawnX, cakeSpawnY),
        'cake',
    ]);

    return cakeObj;
};
