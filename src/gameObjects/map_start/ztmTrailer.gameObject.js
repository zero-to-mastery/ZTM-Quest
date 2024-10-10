export const ztmTrailer = (k, map, spawnpoints) => {
    k.loadSprite('ztmTrailer', './assets/sprites/ztm_trailer.png', {
        sliceX: 3,
        sliceY: 1,
        anims: {
            idle: { from: 0, to: 1, loop: false },
            run: { from: 0, to: 2, loop: true, speed: 1 },
        },
    });

    const [monitorLobby] = map.query({ include: 'monitor_lobby' });

    return k.make([
        k.sprite('ztmTrailer', { anim: 'run' }),
        k.area({
            shape: new k.Rect(
                k.vec2(0, 0),
                monitorLobby.width,
                monitorLobby.height
            ),
        }),
        k.body(),
        k.pos(
            (monitorLobby.pos.x + 2),
            (monitorLobby.pos.y + 9)
        ),
        k.scale(0.8),
        k.body({ isStatic: true }),
        `anim_monitor_lobby`,
        'map_start',
    ]);
};
