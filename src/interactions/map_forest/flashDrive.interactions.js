import { displayDialogue } from '../../utils';
import { playerHasQuest, completeQuestObjective } from '../../utils/questHandler';
import { interactionHandler } from '../handler.interactions';

export const interactionWithFlashDrive = (player, k, map) => {

    const messageToPlayer = "You found a flash drive! " + (playerHasQuest(player, 'Find the Flash Drive')
        ? "This might be Jessica's flash drive! Better return it to her in the city!"
        : "You wonder who it might belong to? You leave it be in case someone comes looking for it.");

    interactionHandler(player, 'flashDrive', k, () => {
        displayDialogue({
            k,
            player,
            characterName: 'Flash Drive',
            text: [
                messageToPlayer
            ],
            onDisplayEnd: async () => {
                if (playerHasQuest(player, 'Find the Flash Drive')) {
                    await completeQuestObjective(
                        player,
                        'Find the Flash Drive',
                        'Found the Flash Drive'
                    )
                }
            }
        });
    });
};
