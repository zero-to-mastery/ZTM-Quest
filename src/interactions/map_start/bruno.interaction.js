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
            onDisplayEnd: () => {
                if (!playerHasQuest(player, 'Start Interacting!')) {
                    recieveQuest(
                        player,
                        map_start_quests['Start Interacting!']
                    );
                }
                completeQuestObjective(
                    player,
                    'Start Interacting!',
                    'hasTalkedToBruno'
                );
                // Internally checks if all objectives are complete
                completeQuest(player, 'Start Interacting!');
            },
        });
    });
};
