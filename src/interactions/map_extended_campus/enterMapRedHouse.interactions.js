import { displayDialogue } from '../../utils';

export const enterMapRedHouse = (player, k) => {
    player.onCollide('enter_map_red_house', () => {
        if (player.state.housesOwned.includes('Red')) {
            k.go('red_house');
        } else {
            displayDialogue({
                k,
                player,
                text: [
                    'You do not own this house.',
                    "you can go to the realtor's office and purchase it if you wish though...",
                ],
            });
        }
    });
};
