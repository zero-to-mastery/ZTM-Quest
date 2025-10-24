import { k } from '../kplayCtx';

export function openSettingsModal() {
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) settingsModal.style.display = 'flex';

  const modalContent = document.querySelector('#settings-modal .modal-content');
  const originalContent = modalContent.innerHTML;

  setTimeout(() => {
    const showControlsBtn = document.getElementById('show-controls-btn');
    if (showControlsBtn) {
      showControlsBtn.onclick = () => {
        const template = document.getElementById('controls-template');
        modalContent.innerHTML = template.innerHTML;
        
        document.getElementById('controls-close-btn').onclick = () => {
          modalContent.innerHTML = originalContent;
          wireSettingsButtons();
        };
      };
    }

    const resetSaveBtn = document.getElementById('reset-save-btn');
    if (resetSaveBtn) {
      resetSaveBtn.onclick = () => {
        const template = document.getElementById('reset-confirm-template');
        modalContent.innerHTML = template.innerHTML;
        
        document.getElementById('reset-cancel-btn').onclick = () => {
          modalContent.innerHTML = originalContent;
          wireSettingsButtons();
        };
        
        document.getElementById('reset-confirm-btn').onclick = () => {
          const audioMuted = localStorage.getItem('ztm-audio-muted');
          const musicVolume = localStorage.getItem('ztm-music-volume');
          
          localStorage.clear();
          
          if (audioMuted) localStorage.setItem('ztm-audio-muted', audioMuted);
          if (musicVolume) localStorage.setItem('ztm-music-volume', musicVolume);
          
          window.location.reload();
        };
      };
    }

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
