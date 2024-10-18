import { displayPermissionBox } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const interactionWithPond = (player, k, map) => {
    interactionHandler(player, 'pond', k, async () => {
        player.isInDialog = true;
        const animation = player.curAnim();
        const flipX = player.flipX;
        player.triggerFishingAnimations(k, player, animation, flipX);
        const wantsToPlay = await displayPermissionBox({
            k,
            player,
            text: [
                'You start fishing...',
                'Would you like to catch some fish?',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (wantsToPlay) {
            initGame(k);
        } else {
            player.isInDialog = false;
        }
    });
};

export const initGame = (k) => {
    k.go('fishing');
};
