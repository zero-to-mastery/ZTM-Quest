import { scaleFactor } from '../constants';
import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { attachInteractions } from '../interactions/map_arcade';
import { addGameObjects } from '../gameObjects/map_arcade';
import { addPlayerControls } from '../player.controls';

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
    const player = makePlayer({}, scaleFactor);

    player.pos = spawnpoint.player;
    k.add(map);
    k.add(player);

    attachInteractions(player, k);
    addGameObjects(k, map, spawnpoint).forEach((obj) => k.add(obj));
    addPlayerControls(k, player);
});
