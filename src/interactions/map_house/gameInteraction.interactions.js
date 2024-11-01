import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const gameInteraction = (player, k) => {
    interactionHandler(player, 'game', k, async () => {
        const decisionToPlay = await displayPermissionBox({
            k,
            player,
            text: ['Would you like to play a game?'],
        });
        if (decisionToPlay) {
            const winOrLose = Math.round(Math.random());
            const options = [
                'You play a video game and successfully win!',
                'You play a video game and lose...',
            ];
            displayDialogue({
                k,
                player,
                text: [options[winOrLose]],
                onDisplayEnd: () => {
                    const selectedOption = options[winOrLose].split(' ').at(-1);
                    if (selectedOption === 'win!') {
                        updateEnergyState(player.state, 5);
                    } else {
                        updateEnergyState(player.state, -20);
                    }
                },
            });
        }
    });
};
