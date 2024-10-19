import { displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const stall1Interaction = (player, k) => {
    player.onCollide('stall_1', async () => {
        let stall1Offer = await displayPermissionBox({
            k,
            player,
            text: [
                '🎉 Welcome to Stall 1! Our secret ingredient is... a sprinkle of **joy**! Ready to snack like a champ?',
            ],
        });

        if (stall1Offer) {
            k.debug.log(
                '🚀 Awesome choice! Here’s your snack – made with love and just a hint of magic!'
            );
            updateEnergyState(player.state, 30);
        } else {
            let secondChance = await displayPermissionBox({
                k,
                player,
                text: [
                    '🤔 Are you absolutely sure? Our snacks are scientifically proven to elevate your happiness levels! Or do you prefer sadness-flavored snacks?',
                ],
            });

            if (secondChance) {
                k.debug.log(
                    '😋 Yass! You’re now part of the snack elite! Enjoy your crispy delight!'
                );
                updateEnergyState(player.state, 30);
            } else {
                k.debug.log(
                    '😢 Your loss! But hey, who am I to judge? Just remember, you’re missing out on epic flavor adventures!'
                );
            }
        }
    });
};

export const stall2Interaction = (player, k) => {
    player.onCollide('stall_2', async () => {
        let stall2Offer = await displayPermissionBox({
            k,
            player,
            text: [
                '🎊 Ahoy! Welcome to Stall 2! We don’t just sell snacks; we sell **memories**! Care to join the flavor revolution?',
            ],
        });

        if (stall2Offer) {
            k.debug.log(
                '🌈 Fantastic! Here’s a snack that might just change your life! Or at least your lunch!'
            );
            updateEnergyState(player.state, 28);
        } else {
            let secondThoughts = await displayPermissionBox({
                k,
                player,
                text: [
                    '🚫 Wait a minute! Are you really about to miss the chance to munch on greatness? Don’t you want to be a snack legend?',
                ],
            });

            if (secondThoughts) {
                k.debug.log(
                    '🌟 You’ve made the right call! Enjoy the epic flavors of Stall 2! Snack on, my friend!'
                );
                updateEnergyState(player.state, 28);
            } else {
                k.debug.log(
                    '🤷‍♂️ Suit yourself! But don’t come crying to me when you realize Stall 1’s snacks are just plain!'
                );
            }
        }
    });
};
