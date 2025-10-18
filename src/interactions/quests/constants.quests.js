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

export const map_realtor = {
    'Buy a house!': makeQuest(
        'Buy a house!',
        "Go to the realtor's office in the extended campus to buy a house!",
        {
            hasTalkedToRealtorClerk: false,
            hasBoughtHouse: false,
        }
    ),
};

export const findFlashDriveQuest = {
    "Find the Flash Drive": makeQuest(
        "Find the Flash Drive",
        "Find the flash drive that Jessica has lost.",
        {
            "Has Talked to Jessica": false,
            "Found the Flash Drive": false,
            "Returned the Flash Drive": false,
        }
    )
}
