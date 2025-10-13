export const americanFootball = (k, map, spawnpoints) => {
    k.loadSprite('americanFootball', './assets/sprites/american-football.png');

    const americanFootballSpawnX = 390;
    const americanFootballSpawnY = 440;

    const americanFootballObj = k.make([
        k.sprite('americanFootball'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + americanFootballSpawnX,
            map.pos.y + americanFootballSpawnY
        ),
        k.scale(0.006),
        k.offscreen({ hide: true, distance: 10 }),
        'americanFootball',
    ]);

    return americanFootballObj;
};
