import gameObjects from '../gameObjects/map_city';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_city';

export async function city() {
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
        './exports/maps/map_city.png',
        './maps/map_city.json'
    );

    return [map, spawnpoint, gameObjects, interactions];
}
