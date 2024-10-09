import { scaleFactor } from '../constants';
import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_city';
import { addGameObjects } from '../gameObjects/map_city';
import { addPlayerControls } from '../player.controls';


export const cityScene = ({ k, enter_tag }) => {
    k.scene('city', async (enter_tag) => {
        const objectConfig = {
            static: [
                'map_boundaries',
                'park_benches',
                'building_boundaries',
                'enter_new_map_boundaries',
            ],
            spawnpoints: ['spawnpoints'],
            interactionObjects: ['interaction_objects'],
        };
        const [map, spawnpoint] = await initMap(
            k,
            objectConfig,
            './exports/maps/map_city.png',
            './maps/map_city.json'
        );
        const player = makePlayer(k, {}, scaleFactor);

        player.pos = (enter_tag && spawnpoint[enter_tag]) || spawnpoint.player;

        k.add(map);
        k.add(player);
        k.canvas.focus();

        attachInteractions(player, k);
        addGameObjects(k, map, spawnpoint).forEach((obj) => map.add(obj));

        addPlayerControls(k, player);
    });

    k.go('city', enter_tag);
}