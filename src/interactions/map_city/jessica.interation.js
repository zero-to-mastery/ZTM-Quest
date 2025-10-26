import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import {
    completeQuestObjective,
    playerHasQuest,
    receiveQuest,
    completeQuest,
    isObjectiveComplete,
} from '../../utils/questHandler';
import { jessicaQuests } from '../quests/constants.quests';
import { updateEnergyState } from '../../utils/energyUpdate';
import { addCoins } from '../../utils/coinsUpdate';

const generateJessicaDialogue = (player) => {
    if (!playerHasQuest(player, 'Find the Flash Drive')) {
        return "Hi, I'm Jessica! Would you please help me find my flash drive? I think I lost it up north in the forest, but I haven't had any luck finding it!";
    } else if (
        // Player has the quest but hasn't found the flash drive yet
        playerHasQuest(player, 'Find the Flash Drive') &&
        !isObjectiveComplete(
            player,
            'Find the Flash Drive',
            'Found the Flash Drive'
        )
    ) {
        return 'Any luck finding my flash drive? I think I lost it up north in the forest.';
    } else if (
        // Player has found the flash drive but hasn't returned it yet
        playerHasQuest(player, 'Find the Flash Drive') &&
        isObjectiveComplete(
            player,
            'Find the Flash Drive',
            'Found the Flash Drive'
        )
    ) {
        return "You found it! Thank you so much for finding my flash drive! I was really worried I'd lost all my work on my Javascript project! You're the best! Let me pay you for your help!";
    } else {
        return 'Have a great day!';
    }
};

export const jessicaInteraction = async (player, k) => {
    interactionHandler(player, 'jessica', k, async () => {
        await displayDialogue({
            k,
            player,
            characterName: 'Jessica',
            text: [generateJessicaDialogue(player)],
            onDisplayEnd: async () => {
                if (!playerHasQuest(player, 'Find the Flash Drive')) {
                    await receiveQuest(
                        player,
                        jessicaQuests.findTheFlashDriveQuest
                    );
                    await completeQuestObjective(
                        player,
                        'Find the Flash Drive',
                        'Has Talked to Jessica'
                    );
                }
                if (
                    playerHasQuest(player, 'Find the Flash Drive') &&
                    !isObjectiveComplete(
                        player,
                        'Find the Flash Drive',
                        'Has Talked to Jessica'
                    )
                ) {
                    await completeQuestObjective(
                        player,
                        'Find the Flash Drive',
                        'Has Talked to Jessica'
                    );
                }
                if (
                    isObjectiveComplete(
                        player,
                        'Find the Flash Drive',
                        'Found the Flash Drive'
                    ) &&
                    !isObjectiveComplete(
                        player,
                        'Find the Flash Drive',
                        'Returned the Flash Drive'
                    )
                ) {
                    updateEnergyState(player.state, 99);
                    addCoins(50);
                    await completeQuestObjective(
                        player,
                        'Find the Flash Drive',
                        'Returned the Flash Drive'
                    );
                }
                // Check if all objectives are complete
                await completeQuest(player, 'Find the Flash Drive');
            },
        });
    });
};
