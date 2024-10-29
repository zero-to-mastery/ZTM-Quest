export const completeQuest = (player, questName) => {
    if (playerHasQuest(player, questName)) {
        if (player.state.quests[questName].done) {
            return;
        }

        const { objectives } = player.state.quests[questName];
        // New object to contain quest properties
        const newObj = {};
        let hasFoundIncompleteObjective = false;
        // If there is an objective that is not finished then alert user
        for (let objective in objectives) {
            if (!objectives[objective]) {
                alert(`You have not finished: "${objective}"`);
                hasFoundIncompleteObjective = true;
            }
        }

        if (hasFoundIncompleteObjective) {
            return;
        }

        // Triggers set handler in Proxy state object
        newObj[questName] = { ...player.state.quests[questName], done: true };
        player.state.quests = { ...player.state.quests, ...newObj };
        alert(`Completed "${questName}"`);
    }
};

export const completeQuestObjective = (player, questName, objective) => {
    // If player does not have quest or objective
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }

    if (player.state.quests[questName].objectives[objective]) {
        return;
    }

    // Sets objective to true status
    player.state.quests[questName].objectives[objective] = true;
    // Triggers set handler in Proxy state object
    player.state.quests = { ...player.state.quests };
    alert(`Completed quest "${objective}"`);
};

export const retrieveQuestObjectiveStatus = (player, questName, objective) => {
    // If player does not have quest or objective
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }

    // Returns objective status
    return player.state.quests[questName].objectives[objective];
};

export const recieveQuest = (player, quest) => {
    if (!playerHasQuest(player, Object.keys(quest)[0])) {
        // Triggers set handler in Proxy state object
        player.state.quests = { ...player.state.quests, ...quest };
    }
};

export const playerHasQuest = (player, questName) => {
    return questName in player.state.quests;
};

const playerHasObjective = (player, questName, objective) => {
    return objective in player.state.quests[questName].objectives;
};

// If you want to add quests, you can recieve them through interactions.
// Use recieveQuest to get the quest via the player's state object.
