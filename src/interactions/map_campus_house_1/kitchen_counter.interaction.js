import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const kitchencounterInteractions = (player, k, map) => {
    player.onCollide('kitchen_slab', async () => {
        let wantCook = await displayPermissionBox({
            k,
            player,
            text: [
                'Are you hungry? Would you like to cook something? (Cooking will take 2 hours)',
            ],
        });

        const dialogue = [];

        if (wantCook) {
            time.minutes += 2; 
            dialogue.push('You prepared a delicious meal!');
            dialogue.push('Your hunger is satisfied.');
            updateEnergyState(player.state, Math.min(player.state.energy + 20, 100)); 
        } else {
            if (player.state.hunger > 70) {
                dialogue.push('You should really consider cooking something to eat!');
            } else {
                dialogue.push('Maybe next time you’ll feel like cooking.');
            }
        }

        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });
};
