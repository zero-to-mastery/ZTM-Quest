import { attachInteractions } from '../../../core/kaplay/interactions';
import { addGameObjects } from '../../../core/kaplay/gameObjects';
import { makeHook } from '../../../factories/hook.factory';
import { makePlayer } from '../../../factories/player.factory';
import { k } from '../../../kplayCtx';
import { addPlayerControls } from '../player.controls';
import { getGameState } from '../../../utils/gameState';
import { setCamScale } from '../../../utils';

export async function bootstrap(bootMapCb, mapArgs) {
    const gameState = getGameState();
    const player = makePlayer(gameState.player);
    player.use(k.sprite('player_fishing', { anim: 'idle-down' }));
    player.use(k.scale(1));
    const hook = makeHook(k);

    const [map, spawnpoint, gameObjects, interactions] = await bootMapCb();

    player.pos = spawnpoint.player;
    hook.pos = spawnpoint.hook;

    k.add(map);
    map.add(player);
    map.add(hook);
    k.canvas.focus();

    addGameObjects(gameObjects, map, spawnpoint).forEach((obj) => {
        map.add(obj);
    });
    addPlayerControls(player, hook, map);
    attachInteractions(interactions, 'player');
}
