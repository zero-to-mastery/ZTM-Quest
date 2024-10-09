const LOCAL_STORAGE_GAME_STATE_KEY = 'gameState';

const initialState = () => ({
    player: {
        hasTalkedToBruno: false,
        wasInRestroom: false,
        hasHandsWashed: false,
        energy: 100,
    },
});

// in memory state
let currentState = undefined;

export const clearSavedGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_GAME_STATE_KEY);
};

export const loadSavedGameState = () => {
    const stringifiedState =
        localStorage.getItem(LOCAL_STORAGE_GAME_STATE_KEY) || null;
    const savedState = JSON.parse(stringifiedState) || initialState();
    return savedState;
};

export const saveGameState = (newState) => {
    const stringifiedState = JSON.stringify(newState);
    localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, stringifiedState);
};

export const getGameState = () => {
    if (currentState) {
        return currentState;
    } else {
        // persistent state
        return loadSavedGameState();
    }
};

export const setGameState = (newState) => {
    currentState = newState;
    saveGameState(currentState);

    return currentState;
};
