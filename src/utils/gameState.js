import { speedByScaleFactor } from '../constants';

const LOCAL_STORAGE_GAME_STATE_KEY = 'gameState';

const initialState = () => ({
    player: {
        hasTalkedToBruno: false,
        wasInRestroom: false,
        hasHandsWashed: false,
        energy: 100,
        speed: speedByScaleFactor,
        direction: 'down',
        isInDialog: false,
        collectedCoins: 0,
        score: 0,
        scene: "start",
        position: { x: 32, y: 384 }
    },
});

// in memory state
let currentState = undefined;

export const clearSavedGame = () => {
    localStorage.removeItem(LOCAL_STORAGE_GAME_STATE_KEY);
    currentState = undefined
};

const syncStateProps = (stateToCheck, defaultState) => {
    for (const prop in defaultState) {
        if (typeof stateToCheck[prop] === 'object') {
            syncStateProps(stateToCheck[prop], defaultState[prop]);
            continue;
        }
        if (!stateToCheck[prop]) {
            stateToCheck[prop] = defaultState[prop];
        }
    }
};

export const loadSavedGameState = () => {
    const defaultState = initialState();
    const stringifiedState =
        localStorage.getItem(LOCAL_STORAGE_GAME_STATE_KEY) || null;
    const savedState = JSON.parse(stringifiedState) || defaultState;

    syncStateProps(savedState, defaultState);
    currentState = savedState;

    return savedState;
};

export const saveGameState = (newState) => {
    const stringifiedState = JSON.stringify(newState);
    localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, stringifiedState);
};

export const getGameState = () => {
    console.log(currentState)
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
