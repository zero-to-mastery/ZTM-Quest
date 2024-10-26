import { setGameState } from './gameState';

export const completeQuest = (player, questName) => {
    if (playerHasQuest(player, questName)) {
        const { objectives } = player.state.quests[questName];
        for (let objective in objectives) {
            if (!objectives[objective]) {
                console.log('an objective is false');
                return;
            }
        }
        console.log('deletes quest object');

        setGameState({ player: { ...player.state } });
    }
    alert('Completed quest!');
};

export const completeQuestObjective = (player, questName, objective) => {
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }
    player.state.quests[questName].objectives[objective] = true;
    player.state.quests = { ...player.state.quests };
    setGameState({ player: { ...player.state } });
    alert('Completed quest objective!');
};

export const retrieveQuestObjectiveStatus = (player, questName, objective) => {
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }
    return player.state.quests[questName].objectives[objective];
};

export const recieveQuest = (player, quest) => {
    if (!playerHasQuest(player, Object.keys(quest)[0])) {
        player.state.quests = { ...player.state.quests, ...quest };
        setGameState({ player: { ...player.state } });
    }
};

const playerHasQuest = (player, questName) => {
    return questName in player.state.quests;
};

const playerHasObjective = (player, questName, objective) => {
    return objective in player.state.quests[questName].objectives;
};
