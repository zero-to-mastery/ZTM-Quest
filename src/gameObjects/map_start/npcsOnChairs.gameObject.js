import { scaleFactor } from '../../constants';
import { makeNpc } from '../../factories/npc.factory';

export const npcsOnChairs = (k, map, spawnpoints) => {
    const npcStore = [];
    const chairPattern = new RegExp(/chair_/g);
    const chairs = map
        .get('*')
        .filter(
            (obj) =>
                obj.tags.filter((tag) => new RegExp(chairPattern).test(tag))
                    .length > 0
        );
        
    for (const chair of chairs) {
        let direction = 'idle-side';

        direction = chair.tiledProps.direction;

        // createa npc for each chair
        const npc = makeNpc(
            chair.name,
            k.vec2(
                (map.pos.x + chair.pos.x + 6) * scaleFactor,
                (map.pos.y + chair.pos.y + 12) * scaleFactor
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
