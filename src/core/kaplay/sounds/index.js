export const addSceneSounds = (sounds, k, map) => {
    sounds.forEach((triggerSound) => triggerSound(k, map));
};
