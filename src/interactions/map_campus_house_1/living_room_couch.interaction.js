import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const livingroomcouchInteractions = (player, k, map) => {
    player.onCollide('livingroom_couch', async () => {
        // Check if the player's energy is below 60
        if (player.state.energy < 60) {
            // Prompt the player to rest
            let wantRest = await displayPermissionBox({
                k,
                player,
                text: [
                    'You look tired. Would you like to rest on the couch? (Increases energy by 10 and advances time by 2 hours)',
                ],
            });

            const dialogue = [];

            if (wantRest) {
                // If player agrees, increase energy and advance time by 2 hours
                updateEnergyState(player.state, player.state.energy + 10);
                time.hours += 2;
                dialogue.push('You took a short rest on the couch.');
                dialogue.push('You feel a bit more refreshed!');
            } else {
                // If player declines, show a message encouraging them to rest later
                dialogue.push('You look exhausted.');
                dialogue.push('Maybe you should rest soon!');
            }

            // Display the dialogue to the player
            displayDialogue({
                k,
                player,
                text: [dialogue.join(' ')],
            });
        }
    });
};
