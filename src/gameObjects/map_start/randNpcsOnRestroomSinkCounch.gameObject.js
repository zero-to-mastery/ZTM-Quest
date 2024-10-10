import { makeNpc } from '../../factories/npc.factory';

const createNpcs = (k, map, pattern, positionAdjustments, npcStore) => {
    const objects = map
        .get('*')
        .filter(
            (obj) =>
                obj.tags.filter((tag) => new RegExp(pattern).test(tag)).length >
                0
        );

    for (const obj of objects) {
        const { x: adjustX, y: adjustY, flipX } = positionAdjustments(obj);

        const npc = makeNpc(
            obj.name,
            k.vec2(
                (map.pos.x + obj.pos.x + adjustX),
                (map.pos.y + obj.pos.y + adjustY)
            ),
            'idle-side',
            'map_start'
        );

        if (flipX) {
            npc.flipX = true;
        }

        npcStore.push(npc);
    }
};

export const randNpcsOnRestroomSinkCounch = (k, map, spawnpoints) => {
    const npcStore = [];

    const restroomPattern = /restroom_door_occupied/g;
    const restrooms = map
        .get('*')
        .filter(
            (obj) =>
                obj.tags.filter((tag) => new RegExp(restroomPattern).test(tag))
                    .length > 0
        );
    // Randomly select 2 out of the 3 restrooms
    const selectedRestrooms = restrooms
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    for (const restroom of selectedRestrooms) {
        const npc = makeNpc(
            restroom.name,
            k.vec2(
                (map.pos.x + restroom.pos.x),
                (map.pos.y + restroom.pos.y)
            ),
            'idle-down',
            'map_start'
        );

        npcStore.push(npc);
    }

    createNpcs(
        k,
        map,
        /restroom_sink/g,
        (obj) => ({
            x: obj.pos.x < 400 ? 15 : 0,
            y: 10,
            flipX: obj.pos.x < 400,
        }),
        npcStore
    );

    createNpcs(
        k,
        map,
        /couch_lobby/g,
        (obj) => ({
            x: obj.pos.x < 200 ? 20 : 0,
            y: 30,
            flipX: obj.pos.x >= 200,
        }),
        npcStore
    );

    return npcStore;
};
