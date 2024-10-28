import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const restroomToiletInteractions = (player, k, map) => {
    player.onCollide('restroom_toilet', async () => {
        let wantUseToilet = await displayPermissionBox({
            k,
            player,
            text: [
                'Do you need to use the restroom? (Time advances 15 minutes)',
            ],
        });

        const dialogue = [];

        if (wantUseToilet) {
            time.minutes += 15;
            dialogue.push('You feel relieved!');
            dialogue.push('Ready to continue your journey.');
            updateEnergyState(player.state, player.state.energy + 10); // Optional small energy boost
        } else {
            if (player.state.energy < 50) {
                dialogue.push('Maybe you should take a break.');
                dialogue.push('It could help you feel more comfortable.');
            } else {
                dialogue.push('You decide to keep going for now.');
            }
        }

        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });
};
