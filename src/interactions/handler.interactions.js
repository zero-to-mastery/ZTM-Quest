import { buildInteractionPrompt, tearDownInteractionPrompt } from '../utils';

export const interactionHandler = (
    player,
    target,
    k,
    onCollide,
    onCollideEnd
) => {
    let keyHandler;
    let clickHandler;

    player.onCollide(target, (sprite) => {
        buildInteractionPrompt(sprite, k);

        function handleOnCollide() {
            tearDownInteractionPrompt(k);
            onCollide();
            clickHandler.cancel();
            keyHandler.cancel();
        }

        try {
            clickHandler = k.onClick(`${sprite.tags[1]}`, () => handleOnCollide());
            keyHandler = k.onKeyPress('t', () => handleOnCollide());
        } catch (e) {
            console.error("Error setting up interaction handlers:", e, target, sprite);
            tearDownInteractionPrompt(k);
        }
    });

    player.onCollideEnd(target, () => {
        tearDownInteractionPrompt(k);

        clickHandler.cancel();
        keyHandler.cancel();

        if (onCollideEnd) {
            onCollideEnd();
        }
    });
};
