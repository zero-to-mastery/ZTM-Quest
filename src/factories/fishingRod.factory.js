import { k } from '../kplayCtx';

export const makeFishingRod = () => {
    if (!k.getSprite('fishingrod')) {
        k.loadSprite('fishingrod', './assets/sprites/fishingrod.png');
    }

    return k.make([
        k.sprite('fishingrod'),
        k.pos(0, 0),
        k.anchor('left'),
        k.scale(0.2),
        k.z(5),
        'fishingRod',
    ]);
};
