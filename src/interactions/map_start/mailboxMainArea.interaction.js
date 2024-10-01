import { displayDialogue } from '../../utils';

export const getDummyText = () => {
    // 0 to 10 (inclusive)
    const num = Math.floor(Math.random() * 11);
    if (num > 1) {
        return `You have ${num} messages in your mailbox`;
    }
    if (num === 1) {
        return `You have ${num} message in your mailbox`;
    }
    if (num === 0) {
        return `You have no messages in your mailbox`;
    }
};

export const interactionWithMainboxMainArea = (player, k, map) => {
    player.onCollide('mailbox_mainArea', () => {
        player.isInDialog = true;
        displayDialogue(getDummyText(), () => {
            player.isInDialog = false;
        });
    });
};
