export const collectCoins = (player, k, map) => {
    player.onCollide('coin', (obj, col) => {
        if(obj) {
            k.destroy(obj);
        }
        player.state.currency ? 
        player.state.currency += 1 : player.state.currency = 1;
    });
};
