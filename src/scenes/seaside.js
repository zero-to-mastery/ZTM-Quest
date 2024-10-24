import gameObjects from '../gameObjects/map_seaside';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_seaside';
import sounds from '../sounds/map_seaside';

export async function seaside() {
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
        './exports/maps/map_seaside.png',
        './maps/map_seaside.json'
    );

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
