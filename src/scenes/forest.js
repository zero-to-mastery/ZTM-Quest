import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_forest';
import { addGameObjects } from '../gameObjects/map_forest';
import { addPlayerControls } from '../player.controls';
import { getGameState } from '../utils/gameState';

export const forestScene = ({ k, enter_tag }) => {
    k.scene('forest', async (enter_tag) => {
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
            './exports/maps/map_forest.png',
            './maps/map_forest.json'
        );

        const gameState = getGameState();
        const player = makePlayer(gameState.player);

        player.pos = (enter_tag && spawnpoint[enter_tag]) || spawnpoint.player;

        k.add(map);
        k.add(player);
        k.canvas.focus();

        addGameObjects(k, map, spawnpoint).forEach((obj) => map.add(obj));
        attachInteractions(player, k);

        addPlayerControls(k, player);
    });

    k.go('forest', enter_tag);
}
