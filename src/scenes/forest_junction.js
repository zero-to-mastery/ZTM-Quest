import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { attachInteractions } from '../interactions/map_forest_junction';
import { addGameObjects } from '../gameObjects/map_forest_junction';
import { addPlayerControls } from '../player.controls';
import { getGameState } from '../utils/gameState';``

k.scene('forest_junction', async (enter_tag) => {
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
        k,
        objectConfig,
        './exports/maps/map_forest_junction.png',
        './maps/map_forest_junction.json',
        k.vec2(0, 11)
    );

    const gameState = getGameState();
    const player = makePlayer(gameState.player);

    player.pos = (enter_tag && spawnpoint[enter_tag]) || spawnpoint.player;

    k.add(map);
    k.add(player);
    k.canvas.focus();

    addGameObjects(k, map, spawnpoint).forEach((obj) => k.add(obj));
    attachInteractions(player, k);

    addPlayerControls(k, player);
});
