export const interactionWithComputer = (player, k, map) => {
    const [computer] = k.query({ include: 'computer' });

    player.onCollide('computer', () => {
        computer.play('on');
    });
    player.onCollideEnd('computer', () => {
        computer.play('off');
    });
};
