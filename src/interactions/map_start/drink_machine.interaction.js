import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';
import { purchaseItem } from '../../utils/coinsUpdate';

let abort;

// List of drinks and possible fun surprises

export const interactionWithDrinksMachine = (player, k, map) => {
    player.onCollide('drinks_machine', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        // Trigger the custom prompt when the player collides with the drinks machine
        showCustomPrompt(
            'What would you like to drink?', // Prompt message
            [
                'Coke (8 coins)',
                'Soda (8 coins)',
                'Water (5 coins)',
                'Sprite (8 coins)',
            ], // Options
            (selectedOption) => {
                // Callback when an option is selected
                // Logic based on the selected option
                const texts = {
                    'Coke (8 coins)': [
                        'Coke - "Taste the Feeling!" A cold refreshment is coming your way!',
                    ],
                    'Soda (8 coins)': [
                        'Soda - "Fizz up your life!" Time for some sparkling fun!',
                    ],
                    'Water (5 coins)': [
                        'Water - "Pure as the mountain stream." Stay hydrated and fresh!',
                    ],
                    'Sprite (8 coins)': [
                        'Sprite - "Obey Your Thirst!" Crisp and refreshing as ever!',
                    ],
                };
                displayDialogue({
                    k,
                    player,
                    text: texts[selectedOption],
                    onDisplayEnd: () => {
                        if (selectedOption == 'Water') {
                            const purchaseStatus = purchaseItem(k, 5, 20);
                            if (purchaseStatus === 'purchased') {
                                updateAchievements(
                                    'Stay hydrated and healthy',
                                    null
                                );
                            }
                        } else {
                            purchaseItem(k, 8, 15);
                        }
                    },
                });
            },
            player,
            k,
            abort
        );
    });
};
