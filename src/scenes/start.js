import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { addGameObjects } from './../gameObjects/map_start';
import { attachInteractions } from './../interactions/map_start';

export async function start() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'chairs',
            'enter_new_map_boundaries',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };
    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_start.png',
        './maps/map_start.json',
        k.vec2(0, 11)
    );

    return [map, spawnpoint, addGameObjects, attachInteractions]
}
