import { displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const snackBarGreenInteraction = (player, k) => {
    player.onCollide('snack_bar_green', async () => {
        player.isInDialog = true;
        let ztmSnackDecision = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Green! Ready to go from zero to snack mastery?',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (ztmSnackDecision) {
            k.debug.log(
                'Congratulations! You’ve mastered the art of snacking, ZTM style!'
            );
            updateEnergyState(player.state, 25);
        } else {
            let secondSnackChance = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? The path to snack mastery is only one bite away...',
                ],
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });

            if (secondSnackChance) {
                k.debug.log(
                    'Great choice! You’re on your way to becoming a Snack Sensei!'
                );
                updateEnergyState(player.state, 25);
            } else {
                k.debug.log(
                    'Looks like you missed the Snack Mastery Bootcamp. Better luck next time!'
                );
            }
        }
    });
};

export const snackBarRedInteraction = (player, k) => {
    player.onCollide('snack_bar_red', async () => {
        player.isInDialog = true;
        let snackOffer = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Red! The *real* masters of snacking... Unlike *ahem* some green wannabes across the street. Ready for the best snack experience?',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (snackOffer) {
            k.debug.log(
                'Excellent choice! You clearly have superior taste. Snack Bar Green can’t compete!'
            );
            updateEnergyState(player.state, 24);
        } else {
            let changeMind = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? Don’t tell me you’re thinking of going to *that* green place... Their snacks are... well, let’s just say "unimpressive."',
                ],
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });

            if (changeMind) {
                k.debug.log(
                    'Wise move! Snack Bar Red – where the real snack mastery happens!'
                );
                updateEnergyState(player.state, 24);
            } else {
                k.debug.log(
                    'Suit yourself! But don’t say I didn’t warn you... Snack Bar Green’s snacks are basically "Zero to Mediocrity."'
                );
            }
        }
    });
};

export const snackBarStreetInteraction = (player, k) => {
    player.onCollide('snack_bar_street', async () => {
        player.isInDialog = true;
        let snackDecision = await displayPermissionBox({
            text: [
                'Psst! You look hungry! How about a snack? It’s a secret recipe!',
            ],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (snackDecision) {
            k.debug.log(
                'Yum! You just ate the best mystery snack of your life!'
            );
            updateEnergyState(player.state, 24);
        } else {
            let secondChance = await displayPermissionBox({
                text: [
                    'Are you sure? It’s low calorie and totally NOT haunted! Still no?',
                ],
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });

            if (secondChance) {
                k.debug.log(
                    'Ah, there we go! Enjoy your... totally normal snack.'
                );
                updateEnergyState(player.state, 24);
            } else {
                k.debug.log(
                    'Your loss! The snack of the century is only a bite away...'
                );
            }
        }
    });
};
