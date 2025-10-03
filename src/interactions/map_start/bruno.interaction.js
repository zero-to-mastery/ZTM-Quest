import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationBruno, bruno } from '../../constants';
import {
    completeQuestObjective,
    completeQuest,
    playerHasQuest,
    recieveQuest,
} from '../../utils/questHandler';
import { map_start_quests } from '../quests/constants.quests';

export const interactionWithBruno = (player, k, map) => {
    interactionHandler(player, bruno.name, k, () => {
        displayDialogue({
            k,
            player,
            characterName: bruno.name,
            text: conversationBruno,
            onDisplayEnd: async () => {
                if (!playerHasQuest(player, 'Start Interacting!')) {
                    await recieveQuest(
                        player,
                        map_start_quests['Start Interacting!']
                    );
                }
                await completeQuestObjective(
                    player,
                    'Start Interacting!',
                    'hasTalkedToBruno'
                );
                // Internally checks if all objectives are complete
                await completeQuest(player, 'Start Interacting!');
            },
        });
    });
};
