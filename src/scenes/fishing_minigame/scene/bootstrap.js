import { attachInteractions } from '../../../core/kaplay/interactions';
import { addGameObjects } from '../../../core/kaplay/gameObjects';
import { makeHook } from '../../../factories/hook.factory';
import { makePlayer } from '../../../factories/player.factory';
import { makeFishingRod } from '../../../factories/fishingRod.factory';
import { k } from '../../../kplayCtx';
import { addPlayerControls } from '../player.controls';
import { getGameState } from '../../../utils/gameState';
import { changePlayerFishingSprite } from '../../../utils/changePlayer';

export async function bootstrap(bootMapCb, mapArgs) {
    const gameState = getGameState();
    const player = makePlayer(gameState.player);

    // Apply the saved character fishing sprite
    const charName = gameState.player?.character?.name || 'junior';
    changePlayerFishingSprite(charName, 'idle-down', k, player);
    player.use(k.scale(1));
    const hook = makeHook(k);
    const fishingRod = makeFishingRod();

    const [map, spawnpoint, gameObjects, interactions] = await bootMapCb();

    player.pos = spawnpoint.player;
    hook.pos = spawnpoint.hook;
    fishingRod.pos = k.vec2(player.pos.x, player.pos.y);

    k.add(map);
    map.add(player);
    map.add(fishingRod);
    map.add(hook);
    k.canvas.focus();

    addGameObjects(gameObjects, map, spawnpoint).forEach((obj) => {
        map.add(obj);
    });
    addPlayerControls(player, hook, map, fishingRod);
    attachInteractions(interactions, 'player');
}
