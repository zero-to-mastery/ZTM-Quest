import { buildActionModal } from '../utils';

export const npcInteractionHandler = (
    player,
    target,
    k,
    onCollide,
    onCollideEnd
) => {
    let keyHandler;
    player.onCollide(target, (sprite) => {
        // Display the modal prompting the user to press 't'
        const { actionModal, actionLabel } = buildActionModal(sprite, k);

        keyHandler = k.onKeyPress('t', () => {
            k.destroy(actionModal);
            k.destroy(actionLabel);
            onCollide();
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

        if (onCollideEnd) {
            onCollideEnd();
        }
    });
};
