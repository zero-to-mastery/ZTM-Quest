import { addGameObjects } from '../core/kaplay/gameObjects';
import { attachInteractions } from '../core/kaplay/interactions';
import { addSceneSounds } from '../core/kaplay/sounds';
import { makePlayer } from '../factories/player.factory';
import { k } from '../kplayCtx';
import { getGameState } from '../utils/gameState';
import { addPlayerControls } from './../player.controls';
import { resetPausingVariables } from '../utils/resetPausingVariables';
import { Backpack } from '../backpack';

// Define handler outside function so we can remove it
let pauseHandler = null;

export async function bootstrap(bootMapCb, mapArgs) {
    const gameState = getGameState();
    const player = makePlayer(gameState.player);

    const [map, spawnpoint, gameObjects, interactions, sounds] =
        await bootMapCb();

    if (mapArgs?.enter_tag === 'Player') {
        player.pos.x = gameState.player.position.x;
        player.pos.y = gameState.player.position.y;
    } else {
        player.pos =
            (mapArgs?.enter_tag && spawnpoint[mapArgs?.enter_tag]) ||
            spawnpoint.player;
    }
    resetPausingVariables(player);

    k.add(map);
    k.add(player);
    k.canvas.focus();

    addPlayerControls(player);
    addGameObjects(gameObjects, map, spawnpoint).forEach((obj) => map.add(obj));
    attachInteractions(interactions, 'player');
    addSceneSounds(sounds, k, map);

    Backpack.backpackInteractions();

    // Remove old pause handler if exists
    if (pauseHandler) {
        document.removeEventListener('keydown', pauseHandler);
    }

    // Create new pause handler
    pauseHandler = (e) => {
        if (e.key === 'Escape') {
            const pauseMenu = document.getElementById('pause-menu');
            if (pauseMenu) {
                if (
                    pauseMenu.style.display === 'none' ||
                    pauseMenu.style.display === ''
                ) {
                    pauseMenu.style.display = 'flex';
                } else {
                    pauseMenu.style.display = 'none';
                }
            }
        }
    };

    // Add new pause handler
    document.addEventListener('keydown', pauseHandler);
}
