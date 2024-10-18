import { time } from '../../kplayCtx';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const teacherInteractions = (player, k, map) => {
    let decisionToLearn = false;

    interactionHandler(
        player,
        'teacher',
        k,
        async () => {
            decisionToLearn = await displayPermissionBox({
                k,
                player,
                text: [
                    'Are you going to sit down and learn for a bit? (Time advances 1 hour)',
                ],
            });
            if (decisionToLearn) time.addHours(1);
        },
        () => {
            if (!decisionToLearn) {
                setTimeout(() => {
                    displayDialogue({
                        k,
                        player,
                        characterName: 'Mrs. Masteria',
                        text: [
                            'Hey! Where are you going? You should sit down and learn some more programming skills',
                        ],
                    });
                }, 1000);
            }
        }
    );
};
