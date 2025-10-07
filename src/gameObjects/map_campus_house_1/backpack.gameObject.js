export const backpack = (k, map) => {
    k.loadSprite('backpack', './assets/sprites/backpack-24.png', {
        sliceX: 0,
        sliceY: 0,
    });

    const [bedroomVanity] = map.query({ include: 'backpack_area' });

    return k.make([
        k.sprite('backpack'),
        k.area(),
        k.pos(bedroomVanity.pos.x - 5, bedroomVanity.pos.y),
        k.body({ isStatic: true }),
        k.scale(0.5),
        k.offscreen({ hide: true, distance: 10 }),
        'backpack',
    ]);
};
