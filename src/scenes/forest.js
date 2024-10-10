import { addGameObjects } from '../gameObjects/map_forest';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_forest';

export async function forest() {
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
        './exports/maps/map_forest.png',
        './maps/map_forest.json'
    );

    return [map, spawnpoint, addGameObjects, attachInteractions]
}
