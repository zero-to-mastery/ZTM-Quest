import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationBruno, bruno } from '../../constants';
import { completeQuestObjective, recieveQuest } from '../../utils/questHandler';
import { map_start_quests } from '../quests/constants.quests';

export const interactionWithBruno = (player, k, map) => {
    interactionHandler(player, bruno.name, k, () => {
        recieveQuest(player, map_start_quests['Start Interacting!']);
        displayDialogue({
            k,
            player,
            characterName: bruno.name,
            text: conversationBruno,
            onDisplayEnd: () => {
                completeQuestObjective(
                    player,
                    'Start Interacting!',
                    'hasTalkedToBruno'
                );
            },
        });
    });
};
