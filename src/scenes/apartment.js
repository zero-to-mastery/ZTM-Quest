import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { k } from '../kplayCtx';
import { attachInteractions } from '../interactions/map_apartment';
import { addGameObjects } from '../gameObjects/map_apartment';
import { addPlayerControls } from '../player.controls';
import { scaleFactor } from '../constants';

k.scene('apartment', async (enter_tag) => {
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
        './exports/maps/map_apartment.png',
        './maps/map_apartment.json'
    );

    const player = makePlayer({}, scaleFactor);

    player.pos = (enter_tag && spawnpoint[enter_tag]) || spawnpoint.player;

    k.add(map);
    k.add(player);
    k.canvas.focus();

    addGameObjects(k, map, spawnpoint).forEach((obj) => k.add(obj));
    attachInteractions(player, k);
    addPlayerControls(k, player);
});
