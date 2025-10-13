import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import {
    playerHasJob,
    startJobQuest,
    completeJobQuest,
} from '../../utils/jobHandler';

export const receptionInteraction = (player, k, map) => {
    interactionHandler(player, 'reception', k, async () => {
        if (playerHasJob(player)) {
            await displayDialogue({
                k,
                player,
                characterName: 'reception',
                text: [
                    'Welcome back, employee! Ready for another productive day?',
                ],
            });
            return;
        }

        const askPlayer = await displayPermissionBox({
            k,
            player,
            text: [
                'Hello there! Are you here to apply for a job with our company?',
            ],
            yesText: 'Apply for a Job',
            noText: 'Maybe Later',
        });

        if (askPlayer) {
            await displayDialogue({
                k,
                player,
                characterName: 'reception',
                text: ["Great! Let's take a quick look at your application..."],
            });

            const isSuccessful = Math.random() < 0.7;

            if (isSuccessful) {
                await startJobQuest(player);
                await completeJobQuest(player);

                await displayDialogue({
                    k,
                    player,
                    characterName: 'reception',
                    text: [
                        'Congratulations! You’ve been hired. Welcome to the team!',
                        'Starting tomorrow, you’ll have regular shifts here. Don’t be late!',
                    ],
                });
            } else {
                await displayDialogue({
                    k,
                    player,
                    characterName: 'reception',
                    text: [
                        'Hmm… It seems we don\'t have a suitable position for you at the moment.',
                        'Check back another time — something might open up soon.',
                    ],
                });
            }

            return;
        }

        await displayDialogue({
            k,
            player,
            characterName: 'reception',
            text: [
                'No problem! If you change your mind, come talk to me again.',
            ],
        });
    });
};
