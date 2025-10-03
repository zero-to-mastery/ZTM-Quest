import { k } from '../kplayCtx';
import { fishSpriteNames } from '../constants';

export const makeFish = (map) => {
    let foundFishSprite = false;
    foundFishSprite =
        fishSpriteNames.filter((name) => k.getSprite(name)).length > 0;
    if (!foundFishSprite) {
        k.loadSprite('fish_1', './assets/sprites/fish_1.png', {
            frames: 0,
        });
        k.loadSprite('fish_2', './assets/sprites/fish_2.png', {
            frames: 0,
        });
        k.loadSprite('fish_3', './assets/sprites/fish_3.png', {
            frames: 0,
        });
        k.loadSprite('fish_4', './assets/sprites/fish_4.png', {
            frames: 0,
        });
    }

    function generateRandomFishTag() {
        return fishSpriteNames[
            Math.floor(Math.random() * fishSpriteNames.length)
        ];
    }

    const fishTag = generateRandomFishTag();

    const verticalOffset = map.get('grass')[0].pos.y + 50;
    const maxVerticalPosition = 275;
    const randomY = Math.random() * (maxVerticalPosition - verticalOffset) + verticalOffset;

    return k.make([
        k.sprite(fishTag),
        k.pos(0, randomY),
        k.area(),
        k.anchor('center'),
        'fish',
        fishTag,
    ]);
};
