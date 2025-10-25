import { displayDialogue } from '../../utils';
import {
    completeQuest,
    completeQuestObjective,
    retrieveQuestObjectiveStatus,
} from '../../utils/questHandler';

export const restroomInteractions = (player, k, map) => {
    const questName = 'Start Interacting!';
    const hasTalkedToBruno = retrieveQuestObjectiveStatus(
        player,
        questName,
        'hasTalkedToBruno'
    );
    player.onCollide('restroom_toilet', () => {
        const dialogue = ['You feel refreshed now.', 'Ready for the ride.'];
        
        if (!hasTalkedToBruno) {
            dialogue.push('You should talk to Bruno first.');
        }
        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
            onDisplayEnd: async () => {
                await completeQuestObjective(player, questName, 'wasInRestroom');
                await completeQuest(player, questName);
            }
        });
    });

    player.onCollide('restroom_sink', () => {
        const sinkObjective = 'hasWashedHands';
        displayDialogue({
            k,
            player,
            text: ['You washed your hands. Good job!'],
            onDisplayEnd: async () => {
                await completeQuestObjective(player, questName, sinkObjective);
                await completeQuest(player, questName);
            },
        });
    });
};
