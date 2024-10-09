import { scaleFactor } from '../constants';
import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_arcade';
import { addGameObjects } from '../gameObjects/map_arcade';
import { addPlayerControls } from '../player.controls';


export const arcadeScene = ({ k }) => {
    k.scene('arcade', async () => {
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
            './exports/maps/map_arcade.png',
            './maps/map_arcade.json',
            k.vec2(29, 11)
        );
        const player = makePlayer(k, {}, scaleFactor);

        player.pos = spawnpoint.player;
        k.add(map);
        k.add(player);
        k.canvas.focus();

        attachInteractions(player, k);
        addGameObjects(k, map, spawnpoint).forEach((obj) => map.add(obj));
        addPlayerControls(k, player);
    });

    k.go('arcade');
}
