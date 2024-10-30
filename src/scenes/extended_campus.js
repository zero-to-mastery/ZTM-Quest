import gameObjects from '../gameObjects/map_extended_campus';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_extended_campus';

export async function extendedCampus() {
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
        './exports/maps/map_extended_campus.png',
        './maps/map_extended_campus.json'
    );

    return [map, spawnpoint, gameObjects, interactions];
}
