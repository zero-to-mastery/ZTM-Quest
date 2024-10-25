import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const BedroomPlantInteractions = (player, k, map) => {
    player.onCollide('plant', async () => {
        // Ask the player if they want to water the plant
        let wantWater = await displayPermissionBox({
            k,
            player,
            text: [
                'The plant looks thirsty. Would you like to water it?',
            ],
        });

        const dialogue = [];

        if (wantWater) {
            // If player agrees, increase energy and show a message
            dialogue.push('You watered the plant.');
            dialogue.push('It looks healthier now!');
            updateEnergyState(player.state, player.state.energy + 10);
        } else {
            // If player declines, warn them about the plant’s state
            dialogue.push('The plant looks sad.');
            dialogue.push('If you don’t water it, it might die!');
        }

        // Display the dialogue to the player
        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });
};
