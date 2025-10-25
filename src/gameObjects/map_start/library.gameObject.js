export const library = (k, map, spawnpoints) => {
    k.loadSprite('library', './assets/sprites/bookcase.png');

    const librarySpawnX = 320;
    const librarySpawnY = 100;

    const libraryObj = k.make([
        k.sprite('library', { frame: 0 }),
        k.area(),
        k.pos(map.pos.x + librarySpawnX, map.pos.y + librarySpawnY),
        k.scale(0.15),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true, distance: 10 }),
        'library',
    ]);

    return libraryObj;
};
