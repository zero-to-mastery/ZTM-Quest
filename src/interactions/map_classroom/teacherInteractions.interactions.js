import { displayDialogue, displayPermissionBox } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const teacherInteractions = (player, k, map) => {
    let decisionToLearn = false;

    interactionHandler(
        player,
        'teacher',
        k,
        async () => {
            player.isInDialogue = true;
            decisionToLearn = await displayPermissionBox({
                k,
                player,
                text: ['Are you going to sit down and learn for a bit?'],
                onDisplayEnd: () => {
                    player.isInDialogue = false;
                },
            });
        },
        () => {
            if (!decisionToLearn) {
                setTimeout(() => {
                    player.isInDialogue = true;
                    displayDialogue({
                        k,
                        player,
                        characterName: 'Mrs. Masteria',
                        text: [
                            'Hey! Where are you going? You should sit down and learn some more programming skills',
                        ],
                        onDisplayEnd: () => {
                            player.isInDialogue = false;
                        },
                    });
                }, 1000);
            }
        }
    );
};
