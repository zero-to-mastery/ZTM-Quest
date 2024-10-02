import { interactionHandler } from '../handler.interactions';

export const interactionWithComputer = (player, k, map) => {
    const [computer] = k.query({ include: 'computer' });

    interactionHandler(
        player,
        'computer',
        k,
        () => computer.play('on'),
        () => computer.play('off')
    );
};
