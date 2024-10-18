import { makeNpc } from '../../factories/npc.factory';

export const npcsInChairs = (k, map, spawnpoints) => {
    const npcStore = [];
    const chairPattern = new RegExp(/chair/g);
    const chairs = map
        .get('*')
        .filter(
            (obj) => obj.tags.filter((tag) => chairPattern.test(tag)).length > 0
        );

    for (const chair of chairs) {
        if (!chair.tags.includes('interaction_object')) {
            // createa npc for each chair
            const npc = makeNpc(
                chair.name,
                k.vec2(
                    map.pos.x + chair.pos.x + 7.43,
                    map.pos.y + chair.pos.y + 4.15
                ),
                'idle-up',
                'map_classroom',
                { shape: new k.Rect(k.vec2(4, 4), 8, 8) }
            );

            npcStore.push(npc);
        }
    }

    return k.chooseMultiple(npcStore, npcStore.length);
};
