import { displayPermissionBox } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';
import { triggerPlayerFishingAnimations } from '../../utils/triggerFishingAnimations';
import { triggerNormalPlayerAnimations } from '../../utils/triggerNormalAnimations';
import { interactionHandler } from '../handler.interactions';

export const interactionWithPond = (player, k, map) => {
    interactionHandler(player, 'pond', k, async () => {
        const animation = player.curAnim();
        const flipX = player.flipX;
        triggerPlayerFishingAnimations(k, player, animation, flipX);
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
            updateAchievements("Let's go fishing!", null);
        } else {
            triggerNormalPlayerAnimations(k, player, animation, flipX);
        }
    });
};

export const initGame = (k) => {
    k.go('fishing');
};
