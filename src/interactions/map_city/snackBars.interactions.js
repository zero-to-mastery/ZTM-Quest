import { displayPermissionBox } from '../../utils';
import { purchaseItem } from '../../utils/coinsUpdate';
import { interactionHandler } from '../handler.interactions';

// Load audio files for snack bars
const snackBarRedAudio = new Audio('/assets/sounds/FoodVendors_voice/Welcome to snackbar red.mp3');
snackBarRedAudio.volume = 0.7;

const snackBarStreetAudio = new Audio('/assets/sounds/FoodVendors_voice/psst, you look hungry.mp3');
snackBarStreetAudio.volume = 0.7;

let currentAudio = null;

function playAudio(audio) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = audio;
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Audio playback failed:', err));
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

export const snackBarGreenInteraction = (player, k) => {
    interactionHandler(player, 'snack_bar_green', k, async () => {
        let ztmSnackDecision = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Green! Ready to go from zero to snack mastery?',
            ],
        });

        if (ztmSnackDecision) {
            k.debug.log(
                'Congratulations! You’ve mastered the art of snacking, ZTM style!'
            );
            purchaseItem(k, 15, 25);
        } else {
            let secondSnackChance = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? The path to snack mastery is only one bite away...',
                ],
            });

            if (secondSnackChance) {
                k.debug.log(
                    'Great choice! You’re on your way to becoming a Snack Sensei!'
                );
                purchaseItem(k, 15, 25);
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
        // Play welcome audio
        playAudio(snackBarRedAudio);
        
        let snackOffer = await displayPermissionBox({
            k,
            player,
            text: [
                'Welcome to Snack Bar Red! The *real* masters of snacking... Unlike *ahem* some green wannabes across the street. Ready for the best snack experience?',
            ],
        });

        if (snackOffer) {
            k.debug.log(
                'Excellent choice! You clearly have superior taste. Snack Bar Green can’t compete!'
            );
            purchaseItem(k, 15, 24);
            stopAudio();
        } else {
            let changeMind = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? Don’t tell me you’re thinking of going to *that* green place... Their snacks are... well, let’s just say "unimpressive."',
                ],
            });

            if (changeMind) {
                k.debug.log(
                    'Wise move! Snack Bar Red – where the real snack mastery happens!'
                );
                purchaseItem(k, 15, 24);
            } else {
                k.debug.log(
                    'Suit yourself! But don’t say I didn’t warn you... Snack Bar Green’s snacks are basically "Zero to Mediocrity."'
                );
            }
            stopAudio();
        }
    });
};

export const snackBarStreetInteraction = (player, k) => {
    interactionHandler(player, 'snack_bar_street', k, async () => {
        // Play welcome audio
        playAudio(snackBarStreetAudio);
        
        let snackDecision = await displayPermissionBox({
            k,
            player,
            text: [
                'Psst! You look hungry! How about a snack? It’s a secret recipe!',
            ],
        });

        if (snackDecision) {
            k.debug.log(
                'Yum! You just ate the best mystery snack of your life!'
            );
            purchaseItem(k, 15, 24);
            stopAudio();
        } else {
            let secondChance = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you sure? It’s low calorie and totally NOT haunted! Still no?',
                ],
            });

            if (secondChance) {
                k.debug.log(
                    'Ah, there we go! Enjoy your... totally normal snack.'
                );
                purchaseItem(k, 15, 24);
            } else {
                k.debug.log(
                    'Your loss! The snack of the century is only a bite away...'
                );
            }
        }
    });
};
