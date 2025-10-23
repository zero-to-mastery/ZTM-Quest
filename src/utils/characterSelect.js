import { CHARACTERS } from './constants';
import { getGameState, setGameState } from './gameState';
import { changePlayerSprite } from '../utils/changePlayer';
import { k } from '../kplayCtx';

export async function showCharacterSelectModal(player) {
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) settingsModal.style.display = 'flex';

  const modalContent = document.querySelector('#settings-modal .modal-content');
  const originalContent = modalContent.innerHTML;

  let characterHTML = `
    <div>
      <h2 style="color:#fff;">Choose Your Character</h2>
      <div class="character-select-grid">
        ${CHARACTERS.map(c =>
          `<div class="char-option"
                data-name="${c.name}"
                tabindex="0"
          >${c.name.charAt(0).toUpperCase() + c.name.slice(1)}</div>`
        ).join("")}
      </div>
      <button id="cancel-charselect-btn" style="margin-top:24px;">Cancel</button>
    </div>
  `;
  modalContent.innerHTML = characterHTML;

  setTimeout(() => {
    document.querySelectorAll('.char-option').forEach(div => {
      div.onclick = () => {
        let gs = getGameState();
        gs.player.character = {
          name: div.dataset.name,
          key: 'characters',
          frame: CHARACTERS.find(char => char.name === div.dataset.name).frames[0]
        };
        setGameState(gs);
        
        if (player) {
          changePlayerSprite(div.dataset.name, 'idle-down', k, player);
        }
        closeModal('settings-modal');
        
        setTimeout(() => {
          k.go('loadingScreen');
        }, 100);
      };
      div.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          div.click();
        }
      });
    });
    document.getElementById('cancel-charselect-btn').onclick = () => {
      modalContent.innerHTML = originalContent;
      closeModal('settings-modal');
    };
  }, 0);

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }
}
