import { displayDialogue } from '../../utils';

export const enterMapOrangeHouse = (player, k) => {
    player.onCollide('enter_map_orange_house', () => {
        if (player.state.housesOwned.includes('Orange')) {
            k.go('orange_house');
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
