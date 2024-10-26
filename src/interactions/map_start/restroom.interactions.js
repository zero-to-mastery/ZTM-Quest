import { displayDialogue } from '../../utils';
import {
    completeQuestObjective,
    retrieveQuestObjectiveStatus,
} from '../../utils/questHandler';

export const restroomInteractions = (player, k, map) => {
    const questName = 'Start Interacting!';
    player.onCollide('restroom_toilet', () => {
        completeQuestObjective(player, questName, 'wasInRestroom');
        const dialogue = ['You feel refreshed now.', 'Ready for the ride.'];

        if (
            !retrieveQuestObjectiveStatus(player, questName, 'hasTalkedToBruno')
        ) {
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
            },
        });
    });
};
