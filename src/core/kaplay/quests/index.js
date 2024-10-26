import { setGameState } from '../../../utils/gameState';

export const addQuests = (player, quests) => {
    if (quests === undefined) {
        return;
    }
    quests.forEach((quest) => {
        if (!Object.keys(player.state.quests).includes(Object.keys(quest)[0])) {
            player.state.quests = { ...player.state.quests, ...quest };
            setGameState({ player: { ...player.state } });
        }
    });
};
