import { time } from '../../kplayCtx';
import { interactionHandler } from '../handler.interactions';
import {
    displayDialogue,
    displayPermissionBox,
    showCustomPrompt,
} from '../../utils';
import {
    completeQuest,
    completeQuestObjective,
    receiveQuest,
} from '../../utils/questHandler';
import { takeAwayCoins } from '../../utils/coinsUpdate';
import { map_realtor } from '../quests/constants.quests';

let abort;

export const counterClerkInteraction = (player, k) => {
    interactionHandler(player, 'counter_clerk', k, async () => {
        await displayDialogue({
            k,
            player,
            characterName: 'Realtor Clerk',
            text: [
                'Hello, we are a firm that gives out houses to residents attending Zero To Mastery.',
                'Would you like to purchase a house?',
            ],
        });
        await receiveQuest(player, map_realtor['Buy a house!']);
        await completeQuestObjective(
            player,
            'Buy a house!',
            'hasTalkedToRealtorClerk'
        );
        const answer = await displayPermissionBox({ k, player, text: [''] });
        if (answer) {
            const possibleHouses = ['Orange House', 'Red House'];
            const choices = [
                ...possibleHouses.filter(
                    (el) => !player.state.housesOwned.includes(el.split(' ')[0])
                ),
                "Neither, I've changed my mind",
            ];
            time.paused = true;
            player.state.isInDialog = true;
            abort = new AbortController();
            showCustomPrompt(
                'Which house would you like to buy?',
                choices,
                (selectedOption) => {
                    const selectedOptionArr = selectedOption.split(' ');
                    if (!selectedOptionArr.includes('House')) {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                "Okay, well let me know if you change your mind and we'll see if we can set you up!",
                            ],
                        });
                        return;
                    }
                    if (player.state.coinsCollected >= 100) {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                'Congratulations!',
                                `You now own the ${selectedOption}!`,
                            ],
                            onDisplayEnd: async () => {
                                player.state.housesOwned = [
                                    ...player.state.housesOwned,
                                    selectedOptionArr[0],
                                ];
                                takeAwayCoins(100);

                                await completeQuestObjective(
                                    player,
                                    'Buy a house!',
                                    'hasBoughtHouse'
                                );
                                await completeQuest(player, 'Buy a house!');
                            },
                        });
                    } else {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                "Oooooof, I'm sorry.",
                                "It looks like you don't have enough coins for the house...",
                            ],
                        });
                    }
                },
                player,
                k,
                abort
            );
        } else {
            await displayDialogue({
                k,
                player,
                characterName: 'Realtor Clerk',
                text: [
                    "Okay, well let me know if you change your mind and we'll see if we can set you up!",
                ],
            });
        }
    });
};
