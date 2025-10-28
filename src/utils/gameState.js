import { speedByScaleFactor } from '../constants';
const LOCAL_STORAGE_GAME_STATE_KEY = 'gameStateZtmQuest';

const initialState = () => ({
    player: {
        energy: 100,
        coinsCollected: 0,
        coinsSpent: 0,
        speed: speedByScaleFactor,
        direction: 'down',
        isInDialog: false,
        collectedCoins: 0,
        quests: {},
        housesOwned: [],
        score: 0,
        scene: 'start',
        position: { x: 32, y: 384 },
        backpack: false,
        character: {
            name: 'junior',
            key: 'characters',
            frame: 0,
        },
        achievements: {
            'Food enthusiast': [],
            'Stay hydrated and healthy': 0,
            'Arcade gamer': [],
            "Let's go fishing!": false,
        },
    },
});

// in memory state
let currentState = undefined;

export const clearSavedGame = () => {
    currentState = undefined;
    localStorage.removeItem(LOCAL_STORAGE_GAME_STATE_KEY);
};

const syncStateProps = (stateToCheck, defaultState) => {
    for (const prop in defaultState) {
        if (
            typeof defaultState[prop] === 'object' &&
            defaultState[prop] !== null
        ) {
            // If property doesn't exist in stateToCheck, initialize it
            if (
                typeof stateToCheck[prop] !== 'object' ||
                stateToCheck[prop] === null
            ) {
                stateToCheck[prop] = Array.isArray(defaultState[prop])
                    ? []
                    : {};
            }
            syncStateProps(stateToCheck[prop], defaultState[prop]);
            continue;
        }
        if (stateToCheck[prop] === undefined || stateToCheck[prop] === null) {
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
