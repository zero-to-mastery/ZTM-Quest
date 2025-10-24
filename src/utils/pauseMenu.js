import { k } from '../kplayCtx';

export function setupPauseMenu() {
  const pauseMenuElement = document.getElementById('pause-menu');
  
  if (!pauseMenuElement) {
    return;
  }

  // Resume button
  const resumeBtn = document.getElementById('resume-game-btn');
  if (resumeBtn) {
    const newResumeBtn = resumeBtn.cloneNode(true);
    resumeBtn.parentNode.replaceChild(newResumeBtn, resumeBtn);
    
    newResumeBtn.addEventListener('click', () => {
      pauseMenuElement.style.display = 'none';
    });
  }

  // Main Menu button
  const mainMenuBtn = document.getElementById('pause-main-menu-btn');
  if (mainMenuBtn) {
    const newMainMenuBtn = mainMenuBtn.cloneNode(true);
    mainMenuBtn.parentNode.replaceChild(newMainMenuBtn, mainMenuBtn);
    
    newMainMenuBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  // Sound toggle button
  const soundBtn = document.getElementById('toggle-sound-btn');
  if (soundBtn) {
    const newSoundBtn = soundBtn.cloneNode(true);
    soundBtn.parentNode.replaceChild(newSoundBtn, soundBtn);
    
    newSoundBtn.addEventListener('click', () => {
      newSoundBtn.classList.toggle('active');
      // Toggle kaplay volume
      const currentVolume = k.volume();
      k.volume(currentVolume > 0 ? 0 : 1);
    });
  }

  // Music toggle button
  const musicBtn = document.getElementById('toggle-music-btn');
  if (musicBtn) {
    const newMusicBtn = musicBtn.cloneNode(true);
    musicBtn.parentNode.replaceChild(newMusicBtn, musicBtn);
    
    newMusicBtn.addEventListener('click', () => {
      newMusicBtn.classList.toggle('active');
      // Add your music toggle logic here
      // Example: k.play('backgroundMusic', { paused: newMusicBtn.classList.contains('active') });
    });
  }
}
