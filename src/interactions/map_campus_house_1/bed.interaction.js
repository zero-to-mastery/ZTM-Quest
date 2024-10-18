import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const bedInteractions = (player, k, map) => {
    player.onCollide('bed', async () => {
        player.isInDialog = true;

        let wantSleep = await displayPermissionBox({
            k,
            player,
            text: [
                'Are you feeling tired?, Would you like to take a nap? (Time advances 8 hours)',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        const dialogue = [];

        if (wantSleep) {
            time.minutes += 8;
            dialogue.push('It was a good nap!');
            dialogue.push('You feel refreshed now.');
            updateEnergyState(player.state, 99);
        } else {
            if (player.state.energy < 70) {
                dialogue.push('You look tired');
                dialogue.push('You should take a nap!');
            } else {
                dialogue.push('Maybe next time!');
            }
        }

        player.isInDialog = true;
        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });
};
