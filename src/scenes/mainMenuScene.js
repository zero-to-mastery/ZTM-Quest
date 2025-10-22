import { k } from '../kplayCtx';
import { openSettingsModal } from '../utils/menuModals';
import { showCharacterSelectModal } from '../utils/characterSelect'; 
import { getGameState, setGameState } from '../utils/gameState';

export function mainMenuScene() {
  const mainMenuElement = document.getElementById('main-menu');
  if (!mainMenuElement) {
    console.error('Main menu element not found in DOM');
    return;
  }

  const startNewGameBtn = document.getElementById('start-new-game-btn');
  const continueGameBtn = document.getElementById('continue-game-btn');
  const achievementsBtn = document.getElementById('main-menu-achievements-btn');
  const statsBtn = document.getElementById('main-menu-stats-btn');
  const settingsBtn = document.getElementById('main-menu-settings-btn');
  const creditsBtn = document.getElementById('main-menu-credits-btn');

  const gameState = getGameState();
  const hasSaveData = gameState && gameState.player && gameState.player.scene;

  if (continueGameBtn) {
    continueGameBtn.style.display = hasSaveData ? 'block' : 'none';
  }

  function replaceButton(btn, handler) {
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', handler);
    return newBtn;
  }

  let isStarting = false;
  let enterHandler;

  replaceButton(startNewGameBtn, () => {
    if (isStarting) return;
    isStarting = true;
    closeAllMenus();
    showCharacterSelectModal();
  });

  if (hasSaveData && continueGameBtn) {
    replaceButton(continueGameBtn, () => {
      if (isStarting) return;
      isStarting = true;
      closeAllMenus();
      startGame(gameState.player.scene);
    });
  }

  replaceButton(achievementsBtn, () => openModal('achievements-modal'));

  replaceButton(statsBtn, () => {
    openModal('stats-modal');
    updateStatsDisplay();
  });

  replaceButton(settingsBtn, () => openSettingsModal());

  replaceButton(creditsBtn, () => openModal('credits-modal'));

  enterHandler = k.onKeyPress('enter', () => {
    if (isStarting) return;
    isStarting = true;

    closeAllMenus();
    showCharacterSelectModal(); 
  });


  function startGame(sceneName) {
    try {
      closeAllMenus();
      if (enterHandler) enterHandler.cancel();
      k.go(sceneName);
    } catch (error) {
      console.error('Error starting game:', error);
      mainMenuElement.classList.remove('hidden');
      mainMenuElement.style.display = 'flex';
      isStarting = false;
    }
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  }

  function closeAllMenus() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach((m) => (m.style.display = 'none'));
    mainMenuElement.classList.add('hidden');
    mainMenuElement.style.display = 'none';
  }

  function updateStatsDisplay() {
    const gs = getGameState();
    const minutes = gs.time?.minutes || 0;
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText('stat-time', hours > 0 ? `${hours}h ${mins}m` : `${mins}m`);
    setText('stat-coins', gs.player?.coins ?? 0);
    setText('stat-energy', gs.player?.energy ?? 100);
    setText('stat-quests', '0');
    setText('stat-maps', '1');
    setText('stat-achievements', '0/0');
  }
}
