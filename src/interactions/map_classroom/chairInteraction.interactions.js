import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';

export const chairInteraction = (player, k, map) => {
    interactionHandler(player, 'chair_1', k, async () => {
        const askChair = await displayPermissionBox({
            k,
            player,
            text: ['Do you ask the chair for its deepest, darkest secrets?'],
        });

        if (askChair) {
            displayDialogue({
                k,
                player,
                characterName: 'Chair',
                text: [
                    'The chair remains silent, as if weighing the burden of its unspoken secrets. After a few awkward moments, you realize it’s probably not much of a talker.',
                ],
            });
            return;
        }
        displayDialogue({
            k,
            player,
            characterName: 'Chair',
            text: [
                'You decide not to pry. After all, even chairs deserve their privacy. The chair seems to appreciate your discretion... or maybe it’s just a chair.',
            ],
        });
    });
};
