import { k } from '../kplayCtx';

export function openSettingsModal() {
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) settingsModal.style.display = 'flex';

  const modalContent = document.querySelector('#settings-modal .modal-content');
  const originalContent = modalContent.innerHTML;

  setTimeout(() => {
    // View Controls button
    const showControlsBtn = document.getElementById('show-controls-btn');
    if (showControlsBtn) {
      showControlsBtn.onclick = () => {
        modalContent.innerHTML = `
          <div class="controls-message">
            <h3>Controls</h3>
            <ul>
              <li>W/↑ - Move Up</li>
              <li>A/← - Move Left</li>
              <li>S/↓ - Move Down</li>
              <li>D/→ - Move Right</li>
              <li>ENTER - Interact</li>
              <li>ESC - Pause Menu</li>
              <li>M - Toggle Map</li>
            </ul>
            <button id="controls-close-btn">OK</button>
          </div>
        `;
        document.getElementById('controls-close-btn').onclick = () => {
          modalContent.innerHTML = originalContent;
          wireSettingsButtons();
        };
      };
    }

    // Reset Game Progress button
    const resetSaveBtn = document.getElementById('reset-save-btn');
    if (resetSaveBtn) {
      resetSaveBtn.onclick = () => {
        modalContent.innerHTML = `
          <div>
            <p>Are you sure you want to reset all game progress? This cannot be undone!</p>
            <button id="reset-cancel-btn">Cancel</button>
            <button id="reset-confirm-btn" class="danger">Reset</button>
          </div>
        `;
        document.getElementById('reset-cancel-btn').onclick = () => {
          modalContent.innerHTML = originalContent;
          wireSettingsButtons();
        };
        document.getElementById('reset-confirm-btn').onclick = () => {
          // Save audio settings before clearing
          const audioMuted = localStorage.getItem('ztm-audio-muted');
          const musicVolume = localStorage.getItem('ztm-music-volume');
          
          // Clear ALL localStorage
          localStorage.clear();
          
          // Restore audio settings
          if (audioMuted) localStorage.setItem('ztm-audio-muted', audioMuted);
          if (musicVolume) localStorage.setItem('ztm-music-volume', musicVolume);
          
          // Reload page
          window.location.href = window.location.href;
        };
      };
    }

    // Save & Close
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
      saveBtn.onclick = () => closeModal('settings-modal');
    }
  }, 0);

  const toggleFullscreenBtn = document.getElementById('toggle-fullscreen-btn');
  if (toggleFullscreenBtn) {
    toggleFullscreenBtn.onclick = () => {
      if (k.isFullscreen?.() ?? false) {
        k.setFullscreen?.(false) ?? k.fullscreen(false);
        toggleFullscreenBtn.classList.remove('active');
      } else {
        k.setFullscreen?.(true) ?? k.fullscreen(true);
        toggleFullscreenBtn.classList.add('active');
      }
    };
  }

  // Rewire listeners after restoring
  function wireSettingsButtons() {
    openSettingsModal();
  }
}

export function setupMenuModals() {
  setupModalCloseHandlers();
}

function setupModalCloseHandlers() {
  const closeButtons = document.querySelectorAll('.close-modal-btn');
  closeButtons.forEach((btn) => {
    btn.onclick = () => {
      const modalId = btn.getAttribute('data-modal');
      if (modalId) closeModal(modalId);
    };
  });

  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach((modal) => {
    modal.onclick = (e) => {
      if (e.target === modal) closeModal(modal.id);
    };
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}
