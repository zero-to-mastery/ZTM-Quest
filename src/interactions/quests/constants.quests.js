import { makeQuest } from '../../factories/quest.factory';

// Structured this way for now so we can get the correct quest and structures are correct for player state
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
    'Start Learning!': makeQuest(
        'Start Learning!',
        'Go to the classroom & start learning a programming language!',
        {
            hasBeenInClassroom: false,
            hasTalkedToTeacher: false,
            hasLearnedASubject: false,
        }
    ),
};
