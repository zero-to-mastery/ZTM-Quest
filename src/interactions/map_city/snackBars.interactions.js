import { displayPermissionBox } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';
import { purchaseItem } from '../../utils/coinsUpdate';
import { interactionHandler } from '../handler.interactions';

export const snackBarGreenInteraction = (player, k) => {
    interactionHandler(player, 'snack_bar_green_1', k, async () => {
        let ztmSnackDecision = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Green! Ready to go from zero to snack mastery?',
            ],
            purchaseCost: 15,
        });

        if (ztmSnackDecision) {
            const purchaseStatus = purchaseItem(k, 15, 25);
            if (purchaseStatus === 'purchased') {
                k.debug.log(
                    'Congratulations! You’ve mastered the art of snacking, ZTM style!'
                );
                updateAchievements('Food enthusiast', 'Snack Bar Green');
            }
        } else {
            let secondSnackChance = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? The path to snack mastery is only one bite away...',
                ],
                purchaseCost: 15,
            });

            if (secondSnackChance) {
                const purchaseStatus = purchaseItem(k, 15, 25);
                if (purchaseStatus === 'purchased') {
                    k.debug.log(
                        'Great choice! You’re on your way to becoming a Snack Sensei!'
                    );
                    updateAchievements('Food enthusiast', 'Snack Bar Green');
                }
            } else {
                k.debug.log(
                    'Looks like you missed the Snack Mastery Bootcamp. Better luck next time!'
                );
            }
        }
    });
};

export const snackBarRedInteraction = (player, k) => {
    interactionHandler(player, 'snack_bar_red', k, async () => {
        let snackOffer = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Red! The *real* masters of snacking... Unlike *ahem* some green wannabes across the street. Ready for the best snack experience?',
            ],
            purchaseCost: 15,
        });

        if (snackOffer) {
            const purchaseStatus = purchaseItem(k, 15, 24);
            if (purchaseStatus === 'purchased') {
                k.debug.log(
                    'Excellent choice! You clearly have superior taste. Snack Bar Green can’t compete!'
                );
                updateAchievements('Food enthusiast', 'Snack Bar Red');
            }
        } else {
            let changeMind = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? Don’t tell me you’re thinking of going to *that* green place... Their snacks are... well, let’s just say "unimpressive."',
                ],
                purchaseCost: 15,
            });

            if (changeMind) {
                const purchaseStatus = purchaseItem(k, 15, 24);
                if (purchaseStatus === 'purchased') {
                    k.debug.log(
                        'Wise move! Snack Bar Red – where the real snack mastery happens!'
                    );
                    updateAchievements('Food enthusiast', 'Snack Bar Red');
                }
            } else {
                k.debug.log(
                    'Suit yourself! But don’t say I didn’t warn you... Snack Bar Green’s snacks are basically "Zero to Mediocrity."'
                );
            }
        }
    });
};

export const snackBarStreetInteraction = (player, k) => {
    interactionHandler(player, 'snack_bar_street', k, async () => {
        let snackDecision = await displayPermissionBox({
            k,
            player,
            text: [
                'Psst! You look hungry! How about a snack? It’s a secret recipe!',
            ],
            purchaseCost: 15,
        });

        if (snackDecision) {
            const purchaseStatus = purchaseItem(k, 15, 24);
            if (purchaseStatus === 'purchased') {
                k.debug.log(
                    'Yum! You just ate the best mystery snack of your life!'
                );
                updateAchievements('Food enthusiast', 'Snack Bar Street');
            }
        } else {
            let secondChance = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? It’s low calorie and totally NOT haunted! Still no?',
                ],
                purchaseCost: 15,
            });

            if (secondChance) {
                const purchaseStatus = purchaseItem(k, 15, 24);
                if (purchaseStatus === 'purchased') {
                    k.debug.log(
                        'Ah, there we go! Enjoy your... totally normal snack.'
                    );
                    updateAchievements('Food enthusiast', 'Snack Bar Street');
                }
            } else {
                k.debug.log(
                    'Your loss! The snack of the century is only a bite away...'
                );
            }
        }
    });
};
