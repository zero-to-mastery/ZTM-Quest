import gameObjects from "../gameObjects/map_graveyard";
import { initMap } from '../init/map.init';
import interactions from "../interactions/map_graveyard";
import sounds from '../sounds/map_graveyard';


export async function graveyard() {
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
        './exports/maps/map_graveyard.png',
        './maps/map_graveyard.json'
    );

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
