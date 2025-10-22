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

    const player = k.add([
        k.sprite('characters', { frame: 0 }), 
        k.pos(spawnpoint.pos),
        k.area(),
    ]);

    const gs = getGameState();
    const charName = gs.player?.character?.name || 'stuart';
    changePlayerSprite(charName, 'idle-down', k, player);

    console.log('Chosen character:', gs.player?.character);
    console.log('Player created with:', charName);

    k.onKeyPress('o', () => {
        k.go('gameOver');
    });

    return [map, spawnpoint, gameObjects, interactions, sounds];
}
