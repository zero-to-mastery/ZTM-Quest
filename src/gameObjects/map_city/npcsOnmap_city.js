import { scaleFactor } from '../../constants';
import { makeNpc } from '../../factories/npc.factory';

export const npcsInCityMap = (k, map, spawnpoints) => {
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
                    (map.pos.x + obj.pos.x + xAdjust) * scaleFactor,
                    (map.pos.y + obj.pos.y + yAdjust) * scaleFactor
                ),
                npcDirection,
                'map_city'
            );

            npcStore.push(npc);
        });
    };

    // Define patterns and their corresponding adjustments
    const npcPatterns = [
        {
            patterns: [/stall_/, /snack_bar_/],
            adjustments: { xAdjust: 12, yAdjust: 18 },
            direction: 'idle-down',
        },
        {
            patterns: [/snack_bar_red/],
            adjustments: { xAdjust: 12, yAdjust: 18 },
            direction: 'idle-up',
        },
        {
            patterns: [/burger_bar_chairs/],
            adjustments: { xAdjust: 12, yAdjust: 6 },
            direction: 'idle-up',
        },
        {
            patterns: [/enter_map_arcade/],
            adjustments: { xAdjust: 12, yAdjust: 6 },
            direction: 'idle-down',
        },
        {
            patterns: [/car_/],
            adjustments: { xAdjust: 30, yAdjust: 6 },
            direction: 'idle-down',
        },
        {
            patterns: [/car_orange/],
            adjustments: { xAdjust: 40, yAdjust: 6 },
            direction: 'idle-side',
        },
        {
            patterns: [/burger_bar_menu_sign/],
            adjustments: { xAdjust: 12, yAdjust: 40 },
            direction: 'idle-down',
        },
    ];

    // Generate NPCs
    npcPatterns.forEach(({ patterns, adjustments, direction }) => {
        createNpcsForPattern(patterns, adjustments, direction);
    });

    return npcStore;
};
