import { displayPermissionBox } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const interactionWithLake = (player, k, map) => {
    interactionHandler(player, 'lake', k, async () => {
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
        });

        if (wantsToPlay) {
            initGame(k);
        }
    });
};

export const initGame = (k) => {
    k.go('lake_fishing');
};
