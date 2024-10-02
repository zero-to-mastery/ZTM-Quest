import { displayDialogueWithoutCharacter } from '../../utils';
import { stopCharacterAnims } from '../../utils/animation';

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
    player.onCollide('mailbox_mainArea', () => {
        player.isInDialog = true;
        stopCharacterAnims(player);
        displayDialogueWithoutCharacter(getDummyText(), () => {
            player.isInDialog = false;
        });
    });
};
