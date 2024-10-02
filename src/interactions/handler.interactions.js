import { buildActionModal } from '../utils';

export const interactionHandler = (
    player,
    target,
    k,
    displayDialogueFunction
) => {
    let keyHandler;
    player.onCollide(target, (sprite) => {
        // Display the modal prompting the user to press 't'
        const { actionModal, actionLabel } = buildActionModal(sprite, k);
        keyHandler = k.onKeyPress('t', () => {
            player.isInDialog = true;
            k.destroy(actionModal);
            k.destroy(actionLabel);
            displayDialogueFunction();
            keyHandler.cancel();
        });
    });

    player.onCollideEnd(target, () => {
        const [actionModal] = k.get('action-modal');
        const [actionLabel] = k.get('action-label');
        if (actionModal) {
            actionModal.destroy();
        }
        if (actionLabel) {
            actionLabel.destroy();
        }
        keyHandler.cancel();
    });
};
