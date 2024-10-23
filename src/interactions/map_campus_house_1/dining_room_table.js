import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomTip } from '../../utils/randomTip';

export const diningRoomTableInteractions = (player, k, map) => {
    player.onCollide('dining_room_table', () => {
        displayDialogue({
            k,
            player,
            text: [
                "You take a look at the dining room table.",
                "Here's a tip about cooking:",
                getRandomTip(),
            ],
        });
        // Assuming looking at the table gives a small energy boost
        updateEnergyState(player.state, player.state.energy + 3);
    });
};
