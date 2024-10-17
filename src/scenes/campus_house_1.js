import gameObjects from '../gameObjects/map_campus_house_1';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_campus_house_1';
import sounds from '../sounds/map_campus_house_1';

export async function campusHouse1() {
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
        './exports/maps/map_campus_house_1.png',
        './maps/map_campus_house_1.json'
    );

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
