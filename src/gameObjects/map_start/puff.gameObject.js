export const puff = (k, map, spawnpoints) => {
    k.loadSprite('puff', './assets/sprites/puff-purple.png');

    const puffSpawnX = 240;
    const puffSpawnYUp = 115;
    const puffSpawnYDown = 55;

    const puffObjUp = k.make([
        k.sprite('puff'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + puffSpawnX, map.pos.y + puffSpawnYUp),
        k.scale(0.4),
        k.offscreen({ hide: true, distance: 10 }),
        'puff',
    ]);

    const puffObjDown = k.make([
        k.sprite('puff'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + puffSpawnX, map.pos.y + puffSpawnYDown),
        k.scale(0.4),
        k.offscreen({ hide: true, distance: 10 }),
        'puff',
    ]);

    return [puffObjUp, puffObjDown];
};
