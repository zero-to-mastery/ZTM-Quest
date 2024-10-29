import { displayDialogue } from '../../utils';
import {
    recieveQuest,
    retrieveQuestObjectiveStatus,
} from '../../utils/questHandler';
import { map_start_quests } from '../quests/constants.quests';

export const enterMapCityRightInteraction = (player, k, map) => {
    const questName = 'Start Interacting!';
    player.onCollide('enter_map_right', () => {
        const hasTalkedToBruno = retrieveQuestObjectiveStatus(
            player,
            questName,
            'hasTalkedToBruno'
        );
        const wasInRestroom = retrieveQuestObjectiveStatus(
            player,
            questName,
            'wasInRestroom'
        );
        const hasWashedHands = retrieveQuestObjectiveStatus(
            player,
            questName,
            'hasWashedHands'
        );
        // Collision point (Enter map boundary) //! NOT THE SPAWNPOINT
        if (
            hasTalkedToBruno &&
            wasInRestroom &&
            hasWashedHands &&
            questName in player.state.quests
        ) {
            k.go('city', 'spawn_office_right'); // City spawn point
        } else {
            recieveQuest(player, map_start_quests['Start Interacting!']);
            if (!hasTalkedToBruno) {
                displayDialogue({
                    k,
                    player,
                    text: [
                        'You should talk to Bruno first.',
                        'He is the guy with the beautiful suit to your left side.',
                    ],
                });

                return;
            } else {
                if (!wasInRestroom) {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'You should visit the restroom first.',
                            'Remember what bruno said? It will be a long journey.',
                            "Don't forget to wash your hands.",
                        ],
                    });
                    return;
                }

                if (!hasWashedHands) {
                    displayDialogue({
                        k,
                        player,
                        text: ['You should wash your hands first.'],
                    });
                }
            }
        }
    });
};
