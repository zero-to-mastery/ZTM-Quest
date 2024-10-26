import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomTip } from '../../utils/randomTip';

export const bedroomPlantInteractions = (player, k, map) => {
    player.onCollide('bedroom_plant', () => {
        displayDialogue({
            k,
            player,
            text: ["Here's a tip for caring for your plants:", getRandomTip()],
        });
        updateEnergyState(player.state, player.state.energy + 3);
    });
};
