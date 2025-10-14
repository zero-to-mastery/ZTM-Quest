import { getGameState, setGameState } from './gameState';

export const updateAchievements = (name, option) => {
    const gameState = getGameState();
    const achievements = gameState.player.achievements;

    if (name === 'Food enthusiast') {
        let present = false;
        for (const stall of achievements[name]) {
            if (stall === option) {
                present = true;
                break;
            }
        }
        if (!present) {
            achievements[name].push(option);
        }
    } else if (name === 'Stay hydrated and healthy') {
        if (achievements[name] < 5) {
            achievements[name] += 1;
        }
    } else if (name === 'Arcade gamer') {
        if (achievements[name].length >= 5) {
            return;
        }
        let present = false;
        for (const machine of achievements[name]) {
            if (machine === option) {
                present = true;
                break;
            }
        }
        if (!present) {
            achievements[name].push(option);
        }
    } else if (name === "Let's go fishing!") {
        if (!achievements[name]) {
            achievements[name] = true;
        }
    }

    setGameState(gameState);
};
