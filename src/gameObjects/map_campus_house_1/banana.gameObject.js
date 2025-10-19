export const banana = (k, map) => {
    k.loadSprite('banana', './assets/sprites/banana.png');

    return k.make([
        k.sprite('banana'),
        k.area(),
        k.pos(18, 123),
        k.body({ isStatic: true }),
        k.scale(0.6),
        k.offscreen({ hide: true, distance: 10 }),
        'banana',
        { assetUrl: './assets/sprites/banana.png' },
    ]);
};
