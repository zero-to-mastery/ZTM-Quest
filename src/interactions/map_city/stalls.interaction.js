import { displayPermissionBox } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';
import { purchaseItem } from '../../utils/coinsUpdate';
import { interactionHandler } from '../handler.interactions';

export const stall1Interaction = (player, k) => {
    interactionHandler(player, 'stall_1', k, async () => {
        let stall1Offer = await displayPermissionBox({
            k,
            player,
            text: [
                '🎉 Welcome to Stall 1! Our secret ingredient is... a sprinkle of **joy**! Ready to snack like a champ?',
            ],
        });

        if (stall1Offer) {
            const purchaseStatus = purchaseItem(k, 20, 30);
            if (purchaseStatus === 'purchased') {
                k.debug.log(
                    '🚀 Awesome choice! Here’s your snack – made with love and just a hint of magic!'
                );
                updateAchievements('Food enthusiast', 'Snack Stall 1');
            }
        } else {
            let secondChance = await displayPermissionBox({
                k,
                player,
                text: [
                    '🤔 Are you absolutely sure? Our snacks are scientifically proven to elevate your happiness levels! Or do you prefer sadness-flavored snacks?',
                ],
            });

            if (secondChance) {
                const purchaseStatus = purchaseItem(k, 20, 30);
                if (purchaseStatus === 'purchased') {
                    k.debug.log(
                        '😋 Yass! You’re now part of the snack elite! Enjoy your crispy delight!'
                    );
                    updateAchievements('Food enthusiast', 'Snack Stall 1');
                }
            } else {
                k.debug.log(
                    '😢 Your loss! But hey, who am I to judge? Just remember, you’re missing out on epic flavor adventures!'
                );
            }
        }
    });
};

export const stall2Interaction = (player, k) => {
    interactionHandler(player, 'stall_2', k, async () => {
        let stall2Offer = await displayPermissionBox({
            k,
            player,
            text: [
                '🎊 Ahoy! Welcome to Stall 2! We don’t just sell snacks; we sell **memories**! Care to join the flavor revolution?',
            ],
        });

        if (stall2Offer) {
            const purchaseStatus = purchaseItem(k, 20, 28);
            if (purchaseStatus === 'purchased') {
                k.debug.log(
                    '🌈 Fantastic! Here’s a snack that might just change your life! Or at least your lunch!'
                );
                updateAchievements('Food enthusiast', 'Snack Stall 2');
            }
        } else {
            let secondThoughts = await displayPermissionBox({
                k,
                player,
                text: [
                    '🚫 Wait a minute! Are you really about to miss the chance to munch on greatness? Don’t you want to be a snack legend?',
                ],
            });

            if (secondThoughts) {
                const purchaseStatus = purchaseItem(k, 20, 28);
                if (purchaseStatus === 'purchased') {
                    k.debug.log(
                        '🌟 You’ve made the right call! Enjoy the epic flavors of Stall 2! Snack on, my friend!'
                    );
                    updateAchievements('Food enthusiast', 'Snack Stall 2');
                }
            } else {
                k.debug.log(
                    '🤷‍♂️ Suit yourself! But don’t come crying to me when you realize Stall 1’s snacks are just plain!'
                );
            }
        }
    });
};
