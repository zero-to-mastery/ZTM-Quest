import { makeNpc } from '../../factories/npc.factory';

export const npcsInArcadeMap = (k, map, spawnpoints) => {
    const npcStore = [];

    // function to spawn NPCs based on object patterns and position adjustments
    const createNpcsForPattern = (
        patterns,
        adjustments,
        direction = 'idle-side'
    ) => {
        const objects = map
            .get('*')
            .filter((obj) =>
                patterns.some((pattern) =>
                    obj.tags.some((tag) => pattern.test(tag))
                )
            );

        objects.forEach((obj) => {
            const { xAdjust, yAdjust } = adjustments;
            const npcDirection = obj.tiledProps?.direction || direction;

            const npc = makeNpc(
                obj.name,
                k.vec2(
                    (map.pos.x + obj.pos.x + xAdjust),
                    (map.pos.y + obj.pos.y + yAdjust)
                ),
                npcDirection,
                'map_arcade'
            );

            npcStore.push(npc);
        });
    };

    // Define patterns and their corresponding adjustments
    const npcPatterns = [
        {
            patterns: [/couch_/],
            adjustments: { xAdjust: 40, yAdjust: 10 },
            direction: 'idle-down',
        },
        {
            patterns: [/bench_/],
            adjustments: { xAdjust: 20, yAdjust: 18 },
            direction: 'idle-side',
        },
        {
            patterns: [/game_machine_crawl/],
            adjustments: { xAdjust: 48, yAdjust: 65 },
            direction: 'idle-up',
        },
        {
            patterns: [/painting_/],
            adjustments: { xAdjust: 35, yAdjust: 25 },
            direction: 'idle-up',
        },
    ];

    // Generate NPCs
    npcPatterns.forEach(({ patterns, adjustments, direction }) => {
        createNpcsForPattern(patterns, adjustments, direction);
    });

    return npcStore;
};
