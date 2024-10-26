import { makeQuest } from '../../factories/quest.factory';

export const map_start_quests = {
    'Start Interacting!': makeQuest(
        'Start Interacting!',
        'Start interacting with the environment!',
        {
            hasTalkedToBruno: false,
            hasWashedHands: false,
            wasInRestroom: false,
        }
    ),
};
