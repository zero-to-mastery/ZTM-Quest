import { getGameState } from './gameState';
import { changePlayerSprite } from './changePlayer';

export const triggerNormalPlayerAnimations = (
    k,
    player,
    startAnimation = 'idle-down',
    flipX = false
) => {
    // Get the selected character from game state
    const gameState = getGameState();
    const charName = gameState.player?.character?.name || 'junior';

    // Update the player's sprite to use the selected character
    changePlayerSprite(charName, startAnimation, k, player);

    // Apply the flip if needed
    if (flipX) {
        player.flipX = flipX;
    }
};
