import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { getGameState } from '../utils/gameState';
import { changePlayerSprite } from '../utils/changePlayer';
import gameObjects from '../gameObjects/map_start';
import interactions from '../interactions/map_start';
import sounds from '../sounds/map_start';

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

    // Get selected character BEFORE creating player
    const gs = getGameState();
    const charName = gs.player?.character?.name || 'junior';

    // Create player with temp sprite
    const player = k.add([
        k.sprite('characters', { frame: 0 }),
        k.pos(spawnpoint.pos),
        k.area(),
    ]);

    // Immediately apply the selected character
    changePlayerSprite(charName, 'idle-down', k, player);

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
