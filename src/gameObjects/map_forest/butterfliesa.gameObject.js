import { scaleFactor } from '../../constants';
import { makeNpc } from '../../factories/npc.factory';

export const butterfliesa = (k, map, spawnpoints) => {
    const npcStore = [];
    const butterfliesPattern = new RegExp(/butterfly_a_/g);
    const butterflies = map
        .get('*')
        .filter(
            (obj) =>
                obj.tags.filter((tag) =>
                    new RegExp(butterfliesPattern).test(tag)
                ).length > 0
        );

    for (const butterfly of butterflies) {
        let direction = 'idle-side';

        direction = butterfly.tiledProps.direction;

        // createa npc for each chair
        const npc = makeNpc(
            butterfly.name,
            k.vec2(
                (map.pos.x + butterfly.pos.x + 6) * scaleFactor,
                (map.pos.y + butterfly.pos.y + 12) * scaleFactor
            ),
            'idle-side',
            'map_start'
        );

        if (direction === 'left') {
            npc.flipX = true;
        }
        npcStore.push(npc);
    }

    return k.chooseMultiple(npcStore, npcStore.length / 3);
};
