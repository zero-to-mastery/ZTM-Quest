import { k, time } from '../kplayCtx';
import { getGameState, clearSavedGame } from './gameState';
import { updateCoinsUI } from './coinsUpdate';

// Mobile menu related

const showSettings = () => {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.classList.add('show-settings');
};

const hideSettings = () => {
    const rightPanel = document.getElementById('right-panel');
    rightPanel.classList.remove('show-settings');
    k.canvas.focus(); // This ensures every time settings is closed then the canvas get back the focus.
};

const menuButton = document.getElementById('menu-button');
const closeBtn = document.getElementById('close-btn');
menuButton.addEventListener('click', showSettings);
closeBtn.addEventListener('click', hideSettings);

// Alert window

const showAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.add('display-flex');
};

const hideAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.remove('display-flex');
    hideSettings(); // This is for the mobile view.
};

// New game related
const clickNewGame = () => {
    time.pause();
    showAlertWindow();
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.add('display-block');
};

const clickNewGameNo = () => {
    time.unpause();
    const newGameAlert = document.querySelector('.new-game-alert');
    newGameAlert.classList.remove('display-block');
    hideAlertWindow();
};

const clickNewGameYes = () => {
    time.unpause();
    time.reset();
    clearSavedGame();
    updateCoinsUI();

    // --- Reset audio state on new game ---
    localStorage.setItem(AUDIO_MUTED_KEY, 'false');
    applyAudioState(false);
    if (audioIcon) {
        audioIcon.src = 'assets/sprites/audio-on.png';
    }
    clickNewGameNo();
    k.go('start');
};

const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', clickNewGame);
const newGameNoButton = document.getElementById('new-game-no-button');
newGameNoButton.addEventListener('click', clickNewGameNo);
const newGameYesButton = document.getElementById('new-game-yes-button');
newGameYesButton.addEventListener('click', clickNewGameYes);

// Stats related

const showStats = () => {
    time.pause();
    const player = getGameState().player;
    const coinsCollected = player.coinsCollected;
    const coinsSpent = player.coinsSpent;

    // Calculation for time spent in game
    const timeSpent = k.time();
    const timeSpentSeconds = Math.floor(timeSpent % 60);
    const timeSpentMinutes = Math.floor((timeSpent / 60) % 60);
    const timeSpentHours = Math.floor(timeSpent / 3600);
    const timeSpentString = `${timeSpentHours}h ${timeSpentMinutes}m ${timeSpentSeconds}s`;

    // Adding updated info in html
    const coinsCollectedElement = document.getElementById('coins-collected');
    coinsCollectedElement.innerHTML = `Coins collected : ${coinsCollected}`;
    const coinsSpentElement = document.getElementById('coins-spent');
    coinsSpentElement.innerHTML = `Coins spent : ${coinsSpent}`;
    const timeSpentElement = document.getElementById('time-spent');
    timeSpentElement.innerHTML = `Time spent : ${timeSpentString}`;

    showAlertWindow();
    const statsAlert = document.querySelector('.stats-alert');
    statsAlert.classList.add('display-block');
};

const hideStats = () => {
    time.unpause();
    const statsAlert = document.querySelector('.stats-alert');
    statsAlert.classList.remove('display-block');
    hideAlertWindow();
};

const statsButton = document.getElementById('stats-button');
statsButton.addEventListener('click', showStats);
const statsCloseButton = document.getElementById('stats-close-button');
statsCloseButton.addEventListener('click', hideStats);

// Debug related

const toggleDebugMode = () => {
    k.debug.inspect = !k.debug.inspect;
    hideSettings(); // This is for the mobile view.
};

const debugButton = document.getElementById('debug-button');
debugButton.addEventListener('click', toggleDebugMode);

// Audio related
// --- AUDIO STATE MANAGEMENT ---
// Keeps the mute/unmute state consistent across scene changes in Kaboom
// and safely handles invalid or outdated values in localStorage.

const AUDIO_MUTED_KEY = 'ztm-audio-muted';

// --- Apply the current audio state (mute or unmute) ---
const applyAudioState = (isMuted) => {
    try {
        if (isMuted) {
            k.setVolume?.(0) ?? k.volume(0); // new API fallback
            k.audioCtx
                ?.suspend?.()
                .catch((e) => console.warn('[AUDIO] Suspend error:', e));
        } else {
            k.setVolume?.(1) ?? k.volume(1);
            k.audioCtx
                ?.resume?.()
                .catch((e) => console.warn('[AUDIO] Resume error:', e));
        }
    } catch (err) {
        console.warn('[AUDIO] Failed to apply audio state:', err);
        // Reset only the corrupted value instead of clearing all localStorage
        localStorage.removeItem(AUDIO_MUTED_KEY);
    }
};

// --- Initialize the audio state from localStorage ---
const initAudioState = () => {
    const savedValue = localStorage.getItem(AUDIO_MUTED_KEY);

    // Validate the saved value and default to false if invalid
    const isMuted = savedValue === 'true' ? true : false;

    applyAudioState(isMuted);

    if (audioIcon) {
        audioIcon.src = isMuted
            ? 'assets/sprites/mute.png'
            : 'assets/sprites/audio-on.png';
    }
};

// --- Toggle the audio state when user clicks the button ---
const toggleAudio = () => {
    const isRunning = k.audioCtx?.state?.includes('running');
    const willMute = isRunning;

    localStorage.setItem(AUDIO_MUTED_KEY, willMute ? 'true' : 'false');
    applyAudioState(willMute);

    if (audioIcon) {
        audioIcon.src = willMute
            ? 'assets/sprites/mute.png'
            : 'assets/sprites/audio-on.png';
    }
};

// --- DOM references ---
const audioIcon = document.getElementById('audio-icon');
const audioButton = document.getElementById('audio-button');
audioButton.addEventListener('click', toggleAudio);

// --- Initialize audio state when settings panel loads ---
initAudioState();

// --- Override k.go() to reapply audio state after every scene change ---
const originalGo = k.go.bind(k);
k.go = (sceneName, ...args) => {
    originalGo(sceneName, ...args);

    // Reapply the audio state after new scene initialization
    setTimeout(() => {
        initAudioState();
    }, 100);
};
