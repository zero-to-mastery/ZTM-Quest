import { k, time } from '../kplayCtx';
import { clearSavedGame } from './gameState';
import { updateCoinsUI } from './coinsUpdate';
import { Backpack } from '../backpack';

const rightPanel = document.getElementById('right-panel');

const showSettings = () => {
  rightPanel.classList.add('show-settings');
};

const hideSettings = () => {
  rightPanel.classList.remove('show-settings');
  k.canvas.focus();
};

const settingsMenuButton = document.getElementById('settings-menu-button');
const closeBtn = rightPanel.getElementsByClassName('close-btn')[0];
settingsMenuButton.addEventListener('click', showSettings);
closeBtn.addEventListener('click', hideSettings);

const showAlertWindow = () => {
  const alertWindow = document.querySelector('.alert-window');
  alertWindow.classList.add('display-flex');
};

const hideAlertWindow = () => {
  const alertWindow = document.querySelector('.alert-window');
  alertWindow.classList.remove('display-flex');
  hideSettings();
};

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
  Backpack.removeButton();
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

const toggleDebugMode = () => {
  k.debug.inspect = !k.debug.inspect;
  hideSettings();
};

const debugButton = document.getElementById('debug-button');
debugButton.addEventListener('click', toggleDebugMode);

const AUDIO_MUTED_KEY = 'ztm-audio-muted';

const applyAudioState = (isMuted) => {
  try {
    if (isMuted) {
      k.setVolume?.(0) ?? k.volume(0);
      k.audioCtx?.suspend?.().catch((e) => console.warn('[AUDIO] Suspend error:', e));
    } else {
      k.setVolume?.(1) ?? k.volume(1);
      k.audioCtx?.resume?.().catch((e) => console.warn('[AUDIO] Resume error:', e));
    }
  } catch (err) {
    console.warn('[AUDIO] Failed to apply audio state:', err);
    localStorage.removeItem(AUDIO_MUTED_KEY);
  }
};

const initAudioState = () => {
  const savedValue = localStorage.getItem(AUDIO_MUTED_KEY);
  const isMuted = savedValue === 'true' ? true : false;
  applyAudioState(isMuted);
  if (audioIcon) {
    audioIcon.src = isMuted
      ? 'assets/sprites/mute.png'
      : 'assets/sprites/audio-on.png';
  }
};

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

const audioIcon = document.getElementById('audio-icon');
const audioButton = document.getElementById('audio-button');
audioButton.addEventListener('click', toggleAudio);

initAudioState();

const musicSlider = document.getElementById('music-volume');
const musicValueLabel = document.getElementById('music-volume-value');
if (musicSlider && musicValueLabel) {
  const musicVol = Math.max(0, Math.min(1, parseFloat(localStorage.getItem('ztm-music-volume') || '1')));
  musicSlider.value = Math.round(musicVol * 100);
  musicValueLabel.textContent = `${musicSlider.value}%`;
  k.setVolume?.(musicVol) ?? k.volume(musicVol);
  musicSlider.addEventListener('input', function () {
    const normalized = musicSlider.value / 100;
    localStorage.setItem('ztm-music-volume', normalized);
    musicValueLabel.textContent = `${musicSlider.value}%`;
    k.setVolume?.(normalized) ?? k.volume(normalized);
  });
}

const saveSettingsBtn = document.getElementById('save-settings-btn');
if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener('click', () => {
    document.getElementById('settings-modal').style.display = 'none';
  });
}

const fullscreenBtn = document.getElementById('toggle-fullscreen-btn');
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}

document.addEventListener('fullscreenchange', () => {
  const fullscreenBtn = document.getElementById('toggle-fullscreen-btn');
  if (fullscreenBtn) {
    if (document.fullscreenElement) {
      fullscreenBtn.classList.add('active');
    } else {
      fullscreenBtn.classList.remove('active');
    }
  }
});
