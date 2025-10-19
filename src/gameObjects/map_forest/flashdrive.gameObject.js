export const flashDrive = (k, map, spawnpoints) => {
    k.loadSprite('flashDrive', './assets/sprites/flashdrive.png');

    const flashDriveObj = k.make([
        k.sprite('flashDrive'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + 52, map.pos.y + 150),
        k.scale(0.5),
        k.offscreen({ hide: true, distance: 10 }),
        'flashDrive',
    ]);

    return flashDriveObj;
};
