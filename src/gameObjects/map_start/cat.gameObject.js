export const cat = (k, map, spawnpoints) => {
    k.loadSprite('cat', './assets/sprites/cat.png', {
        sliceX: 4,
        sliceY: 1,
        anims: {
            laying: { from: 0, to: 3, loop: true, speed: 2 },
        },
    });

    const [treeRoom1] = map.query({ include: 'tree_room_1' });

    const catObj = k.make([
        k.sprite('cat', { frame: 0, anim: 'laying' }),
        k.area(),
        k.pos(treeRoom1.pos.x, treeRoom1.pos.y + 40),
        k.scale(0.7),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true, distance: 10 }),
        'cat',
    ]);

    return catObj;
};
