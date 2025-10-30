import { displayDialogue } from '../../utils';

const getRandomMessage = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const messages = [
    ['The mailbox is empty... Maybe check back later?'],
    ['You found a flyer for a coding bootcamp!'],
    ['Looks like someone forgot to pick up their mail.'],
    ['A postcard from a fellow developer: "Debugging in paradise!"'],
    ['Just some junk mail and pizza coupons.'],
    ['There\'s a letter addressed to "Future Tech Lead" - maybe that\'s you!'],
    ['Empty! The mail carrier must have already been here.'],
    ['You see an envelope with "URGENT: Your code is deploying!" on it.'],
];

export const interactionWithMailbox = (player, k, map) => {
    player.onCollide('mailbox', () => {
        const randomMessage = getRandomMessage(0, messages.length - 1);

        displayDialogue({
            k,
            player,
            text: messages[randomMessage],
        });
    });
};
