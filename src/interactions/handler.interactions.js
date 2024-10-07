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
        // Builds Interaction prompt in right hand of screen
        buildInteractionPrompt(sprite, k);

        function handleOnCollide() {
            // Tears down interaction prompt in right hand of screen
            tearDownInteractionPrompt(k);
            onCollide();
            clickHandler.cancel();
            keyHandler.cancel();
        }
        console.log(sprite);
        clickHandler = k.onClick(`${sprite.tags[0]}`, () =>
            handleOnCollide()
        );
        keyHandler = k.onKeyPress('t', () => handleOnCollide());
    });

    player.onCollideEnd(target, (sprite) => {
        tearDownInteractionPrompt(k);

        clickHandler.cancel();
        keyHandler.cancel();

        if (onCollideEnd) {
            onCollideEnd();
        }
    });
};