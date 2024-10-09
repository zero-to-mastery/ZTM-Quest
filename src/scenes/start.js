import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_start';
import { addGameObjects } from '../gameObjects/map_start';
import { addPlayerControls } from '../player.controls';
import { getGameState } from '../utils/gameState';

export const startScene = ({ k, enter_tag }) => {
    k.scene('start', async (enter_tag) => {
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
            k,
            objectConfig,
            './exports/maps/map_start.png',
            './maps/map_start.json',
            k.vec2(0, 11)
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

    k.go('start', enter_tag);
};