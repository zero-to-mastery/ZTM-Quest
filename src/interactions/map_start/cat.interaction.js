import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

let abort;

export const interactionWithCat = (player, k, map) => {
    player.onCollide('cat', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Cat wants to play with you',
            ['Play', 'Leave'],
            (selectedOption) => {
                const texts = {
                    Play: ['Wow, I feel fresh and energetic!'],
                    Leave: ['Maybe next time!'],
                };
                if (texts[selectedOption]) {
                    displayDialogue({
                        k,
                        player,
                        text: texts[selectedOption],
                        onDisplayEnd: () => {
                            if (selectedOption === 'Play') {
                                updateEnergyState(player.state, 10);
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
