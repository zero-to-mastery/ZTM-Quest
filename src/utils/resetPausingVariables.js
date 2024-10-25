export const resetPausingVariables = (player) => {
    player.state = { ...player.state, isInDialog: false };
};
