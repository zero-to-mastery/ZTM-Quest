import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';

export const computerTwoInteraction = (player, k) => {
    interactionHandler(player, 'computer_2', k, async () => {
        displayDialogue({
            k,
            player,
            text: [
                'You see "Hello, world!" printed on the screen in C++',
                "You think to yourself, wasn't the other screen way more complex?",
                "What's going on here?",
            ],
        });
    });
};
