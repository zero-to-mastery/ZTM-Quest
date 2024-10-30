import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomTip } from '../../utils/randomTip';

export const diningRoomTableInteractions = (player, k, map) => {
    player.onCollide('dining_room_table', () => {
        displayDialogue({
            k,
            player,
            text: ["Here's a fun fact about dining etiquette:", getRandomTip()],
        });
        updateEnergyState(player.state, player.state.energy + 5);
    });
};
