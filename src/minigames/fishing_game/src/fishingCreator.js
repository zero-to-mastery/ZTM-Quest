import { makePlayer } from './characters/makePlayer.characters';
import { makeHook } from './characters/makeHook.characters';
import { makeFish } from './characters/makeFish.characters';
import { configurePlayer } from './configurations/configurePlayer.configurations';
import { configureHook } from './configurations/configureHook.configurations';
import { configureFish } from './configurations/configureFish.configurations';
import { initMap } from './initMap';
import { loadFishingAssets } from './loadFishingAssets';

export const initFishingGame = async (k, type) => {
    loadFishingAssets(k);
    return k.scene(`${type}_fishing`, async () => {
        const [map, spawnpoints] = await initMap(
            {
                static: [
                    'map_boundaries',
                    'park_benches',
                    'building_boundaries',
                    'enter_new_map_boundaries',
                ],
                spawnpoints: ['spawnpoints'],
                interactionObjects: ['interaction_objects'],
            },
            './exports/maps/map_fishing.png',
            './maps/map_fishing.json'
        );

        k.add(map);

        const player = makePlayer(k, spawnpoints, map);

        const hook = makeHook(k, spawnpoints, map);

        configurePlayer(k, player);

        configureHook(k, hook, map);

        configureFish(k, map);

        // Game Configuration that spawns fish randomly
        k.onUpdate(() => {
            map.fishSpawnTimer -= k.dt();

            if (map.fishSpawnTimer <= 0) {
                makeFish(k, map);

                map.fishSpawnTimer = Math.random() * 4 + 1;
            }
        });

        k.onKeyPress('escape', () => {
            type == 'pond'
                ? k.go('forest', 'spawn_bottom')
                : k.go('forest_junction', 'spawn_top');
        });

        k.add([
            k.text('Press esc to stop fishing', { fontSize: 16 }),
            k.pos(map.pos.x + 32, map.pos.y + 32),
            k.z(10),
        ]);
        const scoreTitle = k.add([
            k.text(`Score: ${map.score}`, { fontSize: 16 }),
            k.pos(map.pos.x + 1150, map.pos.y + 32),
            k.z(10),
        ]);

        scoreTitle.onUpdate(() => {
            scoreTitle.text = `Score: ${map.score}`;
        });
    });
};
