import { scaleFactor } from '../../constants';

export const campusHouse1OpenDoor = (k, map, spawnpoints) => {
    k.loadSprite(
        'campusHouse1OpenDoor',
        './assets/sprites/campus_house_door_1.png'
    );

    const [campusHouseDoor1] = map.query({ include: 'campus_house_door_1' });

    return k.make([
        k.sprite('campusHouse1OpenDoor'),
        k.scale(scaleFactor),
        k.area(),
        k.pos(
            campusHouseDoor1.pos.x * scaleFactor,
            (campusHouseDoor1.pos.y - 1) * scaleFactor
        ),
        k.body({ isStatic: true }),
        k.offscreen({ hide: true, distance: 10 }),
        'campusHouse1Door',
    ]);
};
