import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

let abort;

export const interactionWithPuff = (player, k, map) => {
    player.onCollide('puff', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Would you like to sit and rest on the puff? (Time advances 15s)',
            ['Sit', 'Leave'],
            (selectedOption) => {
                const texts = {
                    Sit: ['Wow, I feel fresh and energetic!'],
                    Leave: ['No way! I want to keep exploring!'],
                };
                if (texts[selectedOption]) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            if (selectedOption === 'Sit') {
                                updateEnergyState(player.state, 15);
                                if (time.seconds + 15 >= 60) {
                                    time.minutes += 1;
                                    time.seconds = (time.seconds + 15) % 60;
                                } else {
                                    time.seconds += 15;
                                }
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
