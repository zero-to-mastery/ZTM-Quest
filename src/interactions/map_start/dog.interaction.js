import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

let abort;

export const interactionWithDog = (player, k, map) => {
    player.onCollide('dog', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'The dog is excited to play with you!',
            ['Play', 'Leave'],
            (selectedOption) => {
                const texts = {
                    Play: ['I’m feeling great and ready for action!'],
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
