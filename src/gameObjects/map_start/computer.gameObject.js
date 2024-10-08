import { scaleFactor } from '../../constants';

export const computer = (k, map, spawnpoints) => {
    k.loadSprite('computer', './assets/sprites/laptop.png', {
        sliceX: 4,
        sliceY: 4,
        anims: {
            on: { from: 2, to: 3, loop: false },
            off: { from: 3, to: 2, loop: false },
        },
    });

    const [tableRoom1] = map.query({ include: 'table_room_1' });

    return k.make([
        k.sprite('computer', { frame: 2 }),
        k.area(),
        k.pos(
            (tableRoom1.pos.x + 3) * scaleFactor,
            (tableRoom1.pos.y + 30) * scaleFactor
        ),
        k.body({ isStatic: true }),
        'computer',
    ]);
};
