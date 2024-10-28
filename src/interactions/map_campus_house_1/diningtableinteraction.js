import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const diningTableInteractions = (player, k, map) => {
    player.onCollide('diningTable', async () => {
        let wantEat = await displayPermissionBox({
            k,
            player,
            text: [
                'Are you hungry? Would you like to have a meal? (Time advances 1 hour)',
            ],
        });

        const dialogue = [];

        if (wantEat) {
            time.minutes += 60;
            dialogue.push('You enjoyed a delicious meal!');
            dialogue.push('You feel more energized now.');
            updateEnergyState(player.state, 75);
        } else {
            if (player.state.energy < 50) {
                dialogue.push('You look a bit weak.');
                dialogue.push('It might be time for a meal!');
            } else {
                dialogue.push('No worries, maybe later!');
            }
        }

        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });
};
