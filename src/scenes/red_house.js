import gameObjects from '../gameObjects/map_house';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_house';

export async function redHouse() {
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
        './exports/maps/map_red_house.png',
        './maps/map_house.json'
    );

    return [map, spawnpoint, gameObjects, interactions];
}
