import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import { playerHasJob } from '../../utils/jobHandler';
import { addCoins } from '../../utils/coinsUpdate';

export const bossInteraction = (player, k, map) => {
    const pay = 100;
    interactionHandler(player, 'bos', k, async () => {
        if (playerHasJob(player)) {
            const playerChoice = await displayPermissionBox({
                k,
                player,
                text: ['Ah, good to see you. Do you want to start work?'],
            });

            if (playerChoice === true) {
                addCoins(pay);

                await displayDialogue({
                    k,
                    player,
                    characterName: 'boss',
                    text: [
                        `Great! Let's get started on today's work.`,
                        `You completed your shift and earned $${pay}.`,
                    ],
                });
            } else {
                await displayDialogue({
                    k,
                    player,
                    characterName: 'boss',
                    text: [
                        `Your current daily pay is $${pay}.`,
                        `Keep performing well, and we might increase that!`,
                    ],
                });
            }

            return;
        }

        await displayDialogue({
            k,
            player,
            characterName: 'boss',
            text: [
                'I don’t believe you work here. Speak with reception if you’re looking for a job.',
            ],
        });
    });
};
