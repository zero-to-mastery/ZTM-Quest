import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import gameObjects from '../gameObjects/map_start';
import interactions from '../interactions/map_start';
<<<<<<< HEAD
import sounds from '../sounds/map_start';
=======
>>>>>>> e2f0b73 (removed the feature to hide and show instructions, also added a)


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




    k.onKeyPress('o', () => {
        k.go('gameOver');
    });


    return [map, spawnpoint, gameObjects, interactions, sounds];
}

