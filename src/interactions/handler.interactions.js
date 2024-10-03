import { buildActionModal } from '../utils';

export const npcInteractionHandler = (
    player,
    target,
    k,
    onCollide,
    onCollideEnd
) => {
    let keyHandler;
    let clickHandler;

    player.onCollide(target, (sprite) => {
        // Display the modal prompting the user to press 't'
        const { actionModal, actionLabel } = buildActionModal(sprite, k);

        function handleOnCollide() {
            k.destroy(actionModal);
            k.destroy(actionLabel);
            onCollide();
            clickHandler.cancel();
            keyHandler.cancel();
        }

        clickHandler = k.onClick('action-modal', () => handleOnCollide());
        keyHandler = k.onKeyPress('t', () => handleOnCollide());
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

        clickHandler.cancel();
        keyHandler.cancel();

        if (onCollideEnd) {
            onCollideEnd();
        }
    });
};
