import { addGameObjects } from '../gameObjects/map_arcade';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_arcade';
import { k } from '../kplayCtx';

export async function arcade() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'park_benches',
            'building_boundaries',
            'enter_new_map_boundaries',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_arcade.png',
        './maps/map_arcade.json',
        k.vec2(29, 11)
    );

    return [map, spawnpoint, addGameObjects, attachInteractions]
}
