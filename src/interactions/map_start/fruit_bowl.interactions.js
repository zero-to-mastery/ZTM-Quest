import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

let abort;

export const interactionWithFruitBowl = (player, k, map) => {
    player.onCollide('fruit_bowl_lobby', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Would you like to eat a fruit?',
            ['Yes', 'No'],
            (selectedOption) => {
                const texts = {
                    Yes: ['Wow, I feel fresh and energetic!'],
                    No: ['I am already stuffed'],
                };
                if (texts[selectedOption]) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            if (selectedOption === 'Yes') {
                                updateEnergyState(player.state, 25);
                            }
                        },
                    });
                }
            },
            player,
            k,
            abort
        );
    });
};
