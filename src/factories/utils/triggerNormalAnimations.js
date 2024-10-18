export const triggerNormalAnimations = (
    k,
    player,
    startAnimation = 'idle-down',
    flipX = false
) => {
    // Update the player's sprite to use the new character
    player.use(k.sprite('player', { anim: startAnimation, flipX }));
};
