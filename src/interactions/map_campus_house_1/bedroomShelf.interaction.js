import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomTip } from '../../utils/randomTip';

export const bedroomShelfInteractions = (player, k, map) => {
    player.onCollide('bedroom_shelf', () => {
        player.isInDialog = true;

        displayDialogue({
            k,
            player,
            text: ["Here's a tip for learning to code:", getRandomTip()],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
        updateEnergyState(player.state, player.state.energy + 5);
    });
};
