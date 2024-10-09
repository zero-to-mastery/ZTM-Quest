import { makePlayer } from '../factories/player.factory';
import { initMap } from '../init/map.init';
import { attachInteractions } from '../interactions/map_campus_house_1';
import { addGameObjects } from '../gameObjects/map_campus_house_1';
import { addPlayerControls } from '../player.controls';
import { scaleFactor } from '../constants';


export const campusHouse1Scene = ({ k, enter_tag }) => {

    k.scene('campus_house_1', async (enter_tag) => {
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
            './exports/maps/map_campus_house_1.png',
            './maps/map_campus_house_1.json'
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

    k.go('campus_house_1', enter_tag);
}
