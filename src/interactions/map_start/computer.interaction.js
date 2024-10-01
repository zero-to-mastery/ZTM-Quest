export const interactionWithComputer = (player, k, map) => {
    player.onCollide('computer', () => {
        const [computer] = k.query({ include: 'computer'});
        computer.play('on');
    });
    player.onCollideEnd('computer', () => {
        const [computer] = k.query({ include: 'computer'});
        computer.play('off');
    })
}