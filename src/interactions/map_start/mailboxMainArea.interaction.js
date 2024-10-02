import { displayDialogueWithoutCharacter } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const getDummyText = () => {
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
    interactionHandler(player, 'mailbox_mainArea', k, () => {
        player.isInDialog = true;
        displayDialogueWithoutCharacter(getDummyText(), () => {
            player.isInDialog = false;
        });
    });
};
