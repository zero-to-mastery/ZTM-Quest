import gameObjects from '../gameObjects/map_downtown';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_downtown';
import sounds from '../sounds/map_downtown';

export async function downtown() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'enter_new_map_boundaries',
            // 'objects',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_downtown.png',
        './maps/map_downtown.json'
    );

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
