import gameObjects from '../gameObjects/map_fishing';
import interactions from '../interactions/map_fishing';
import { initMap } from '../init/minigameMap.init.js';

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
