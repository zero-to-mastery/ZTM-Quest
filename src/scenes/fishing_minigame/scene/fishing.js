import gameObjects from '../gameObjects/index.js';
import interactions from '../interactions/index.js';
import { initMap } from '../init/map.init';

export async function fishing() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'enter_new_map_boundaries',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_fishing.png',
        './maps/map_fishing.json'
    );

    return [map, spawnpoint, gameObjects, interactions];
}
