import { scaleFactor } from "../../constants";

export const computer = (k, map, spawnpoints) => {
    k.loadSprite('computer', './laptop.png', {
        sliceX: 4,
        sliceY: 4,
        anims: {
            on: { from: 2, to: 3, loop: false },
        }
    });

    const [tableRoom1] = map.query({ include: 'table_room_1'});

    return k.make([
        k.sprite('computer', { frame: 2 }),
        k.area(),
        k.pos(
            (tableRoom1.pos.x + 10) * scaleFactor,
            (tableRoom1.pos.y + 26) * scaleFactor
        ),
        k.body({ isStatic: true }),
        'computer'
    ])
}