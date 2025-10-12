// jobHandler.js
import { playerHasQuest, recieveQuest, completeQuest } from './questHandler.js';

export const JOB_QUEST_NAME = 'company_job';

/**
 * Check if the player currently has a job
 */
export const playerHasJob = (player) => {
    return (
        playerHasQuest(player, JOB_QUEST_NAME) &&
        player.state.quests[JOB_QUEST_NAME].done === true
    );
};

/**
 * Starts the job quest for the player if they don't have it yet
 */
export const startJobQuest = async (player) => {
    if (!playerHasQuest(player, JOB_QUEST_NAME)) {
        await recieveQuest(player, {
            [JOB_QUEST_NAME]: {
                done: false,
                objectives: {},
            },
        });
    }
};

/**
 * Mark the job quest as completed (hired)
 */
export const completeJobQuest = async (player) => {
    await completeQuest(player, JOB_QUEST_NAME);
};
