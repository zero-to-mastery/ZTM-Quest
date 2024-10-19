import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { getRandomCodingJoke } from '../../utils/randomCodingJokes.js';

export const livingRoomCouchInteractions = (player, k, map) => {
    player.onCollide('living_room_couch', () => {
        const jokeStarter =
            'You sit down on the couch and suddenly feel a bit funny. Here’s a joke to lighten the mood:';
        displayDialogue({
            k,
            player,
            text: [jokeStarter, getRandomCodingJoke()],
        });
        updateEnergyState(player.state, player.state.energy + 5);
    });
};
