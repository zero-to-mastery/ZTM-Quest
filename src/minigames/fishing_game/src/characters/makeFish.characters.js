export const makeFish = (k, map) => {
    // Has to fit in boundary
    // Can flip

    function generateRandomFishTag() {
        const fishSpriteNames = ['fish_1', 'fish_2', 'fish_3', 'fish_4'];
        return fishSpriteNames[
            Math.floor(Math.random() * fishSpriteNames.length)
        ];
    }

    const fishTag = generateRandomFishTag();

    const verticalOffset = map.get('grass')[0].pos.y + 50;
    const fish = k.make([
        k.sprite(fishTag),
        k.pos(0, Math.random() * (275 - verticalOffset) + verticalOffset),
        k.area(),
        k.anchor('center'),
        'fish',
        fishTag,
    ]);

    map.add(fish);
};
