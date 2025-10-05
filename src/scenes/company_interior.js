import gameObjects from '../gameObjects/map_company_interior';
import { initMap } from '../init/map.init';
import interactions from '../interactions/map_company_interior';
// import sounds from '../sounds/map_company_interior';

export async function companyInterior() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'objects_enter_new_map',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_company_interior.png',
        './maps/map_company_interior.json'
    );

    // map.scale = k.vec2(2, 1);

    return [map, spawnpoint, gameObjects, interactions];
}
