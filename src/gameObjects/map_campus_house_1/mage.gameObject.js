import { scaleFactor } from '../../constants';

export const mage = (k, map, spawnpoints) => {
    k.loadSprite('mage', './assets/sprites/characters.png', {
        sliceX: 10,
        sliceY: 20,
        anims: {
            'idle-down': 140,
            'walk-down': { from: 144, to: 145, loop: true, speed: 4 },
            'idle-up': 141,
            'walk-up': { from: 146, to: 147, loop: true, speed: 4 },
            'idle-right': 142,
        },
    });

    const [bedRoomTable] = map.query({ include: 'bedroom_table' });

    const mageObj = k.make([
        k.sprite('mage', { anim: 'idle-right' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(bedRoomTable.pos.x + 5, bedRoomTable.pos.y - 70),
        k.scale(scaleFactor * 0.5),
        k.offscreen({ hide: true, distance: 10 }),
        'mage',
    ]);

    return mageObj;
};
