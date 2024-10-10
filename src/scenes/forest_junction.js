import gameObjects from '../gameObjects/map_forest_junction';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_forest_junction';

export async function forestJunction() {
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
        './exports/maps/map_forest_junction.png',
        './maps/map_forest_junction.json'
    );

    return [map, spawnpoint, gameObjects, interactions]
}
