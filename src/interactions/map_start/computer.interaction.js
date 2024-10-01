export const interactionWithComputer = (player, k, map) => {
    player.onCollide('computer', () => {
        console.log('interaction with computer')
    })
}