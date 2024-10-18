import gameObjects from '../gameObjects/map_classroom';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_classroom';
import sounds from '../sounds/map_classroom';

export async function classroom() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'enter_new_map_boundaries',
            'chairs',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_classroom.png',
        './maps/map_classroom.json'
    );

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
