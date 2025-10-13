export const dog = (k, map, spawnpoints) => {
    k.loadSprite('dog', './assets/sprites/dog.png', {
        sliceX: 4,
        sliceY: 1,
        anims: {
            bark: { from: 1, to: 2, loop: true, speed: 1 },
        },
    });

    const [treeRoom1] = map.query({ include: 'tree_room_1' });

    const dogObj = k.make([
        k.sprite('dog', { frame: 0, anim: 'bark' }),
        k.area(),
        k.pos(treeRoom1.pos.x + 320, treeRoom1.pos.y + 195),
        k.scale(0.4),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true, distance: 10 }),
        'dog',
    ]);

    return dogObj;
};
