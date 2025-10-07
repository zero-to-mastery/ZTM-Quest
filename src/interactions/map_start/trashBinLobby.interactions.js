import { displayDialogue } from '../../utils';
import { addCoins } from '../../utils/coinsUpdate';

// random index of trash items
const getRndTrash = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// trash items
const trash = [
    ['Nothing special here... Just wasted items.'],
    ['A stinky socket...'],
    ['You found a rare Pokémon card here!'],
    ['You found a coin! You have one more now!'],
    ['Empty buttle.'],
    ['Crumpled paper...'],
];

// player can find funny item in trash bin
// if hit a coin, he can collect one!
export const interactionWithTrashBin = (player, k, map) => {
    player.onCollide('trash_bin_lobby', () => {
        const randomTrash = getRndTrash(0, trash.length - 1);

        displayDialogue({
            k,
            player,
            text: trash[randomTrash],
        });

        if (
            trash[randomTrash][0] == 'You found a coin! You have one more now!'
        ) {
            addCoins(1);
        }
    });
};
