import { k } from '../../../kplayCtx.js';
import gameObjects from '../gameObjects/index.js';
import interactions from '../interactions/index.js';
import { initMap } from '../../../init/map.init';

export async function fishing() {
    const objectConfig = {
        static: [
            'map_boundaries',
            'building_boundaries',
            'enter_new_map_boundaries',
        ],
        spawnpoints: ['spawnpoints'],
        interactionObjects: ['interaction_objects'],
    };

    const leftPanel = document.getElementById('left-panel');

    const mapOffset = k.isTouchscreen()
        ? k.vec2(-300, -64)
        : k.vec2(
              leftPanel.offsetWidth * 2 + leftPanel.offsetWidth / 4,
              header.offsetHeight
          );

    const mapConfig = {
        mapOffset: mapOffset,
        additionalProperties: {
            pressed: false,
            pressedTwice: false,
            fishSpawnTimer: Math.random() * 5,
            score: 0,
        },
        characterOffset(entityX, entityY) {
            return k.vec2(entityX, entityY);
        },
    };

    const [map, spawnpoint] = await initMap(
        objectConfig,
        './exports/maps/map_fishing.png',
        './maps/map_fishing.json',
        k.vec2(0, 0),
        mapConfig
    );

    return [map, spawnpoint, gameObjects, interactions];
}
