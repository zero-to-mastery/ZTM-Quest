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
        completeQuestObjective(player, questName, 'wasInRestroom');
        completeQuest(player, questName);
        const dialogue = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!hasTalkedToBruno) {
            dialogue.push('You should talk to Bruno first.');
        }
        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });

    player.onCollide('restroom_sink', () => {
        const sinkObjective = 'hasWashedHands';
        displayDialogue({
            k,
            player,
            text: ['You washed your hands. Good job!'],
            onDisplayEnd: () => {
                completeQuestObjective(player, questName, sinkObjective);
                completeQuest(player, questName);
            },
        });
    });
};
