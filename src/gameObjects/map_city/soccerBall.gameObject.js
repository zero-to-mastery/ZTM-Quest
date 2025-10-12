export const soccerBall = (k, map, spawnpoints) => {
    k.loadSprite('soccerBall', './assets/sprites/soccerBall.png');

    const soccerBallSpawnX = 610;
    const soccerBallSpawnY = 480;

    const soccerBallObj = k.make([
        k.sprite('soccerBall'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + soccerBallSpawnX, map.pos.y + soccerBallSpawnY),
        k.scale(0.008),
        k.offscreen({ hide: true, distance: 10 }),
        'soccerBall',
    ]);

    return soccerBallObj;
};
