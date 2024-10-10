import { scaleFactor } from '../../constants';

export const computer = (k, map, spawnpoints) => {
    k.loadSprite('computer', './assets/sprites/laptop.png', {
        sliceX: 4,
        sliceY: 4,
        anims: {
            on: { from: 4, to: 5, loop: false },
            off: { from: 5, to: 4, loop: false },
        },
    });

    const [diningRoomTable] = map.query({ include: 'dining_room_table' });
    const tableWidth = diningRoomTable.area.shape.width;
    const tableHeight = diningRoomTable.area.shape.height;

    return k.make([
        k.sprite('computer', { frame: 4 }),
        k.area(),
        k.pos(
            (tableWidth + diningRoomTable.pos.x - 20) * scaleFactor,
            (tableHeight + diningRoomTable.pos.y - 20) * scaleFactor
        ),
        k.body({ isStatic: true }),
        k.scale(scaleFactor - 0.7),
        k.offscreen({ hide: true, distance: 10 }),
        'computer',
    ]);
};
