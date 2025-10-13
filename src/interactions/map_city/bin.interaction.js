import { displayDialogue } from '../../utils';

// random index of trash items
const getRandomBinTrash = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// trash items
const trash = [
    ['Nothing special here... Just wasted items.'],
    ['Banana peel...'],
    ['Unsorted trash... plastic with paper? Unbelievable!'],
    ['Old parking ticket...'],
    ['Empty can...'],
    ['Chewed gum...'],
    ['Used tissues...'],
    ['Plastic wrapper...'],
    ['Apple cores...'],
    ['A dog poop... in the bin! Seriously, the neighbors and their clean grass!'],
];

// player can find funny item in trash bin

export const interactionWithBin = (player, k, map) => {
    player.onCollide('bin', () => {
        const randomTrash = getRandomBinTrash(0, trash.length - 1);

        displayDialogue({
            k,
            player,
            text: trash[randomTrash],
        });
    });
};
