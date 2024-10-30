export const addSceneSounds = (sounds, k, map) => {
    if (sounds === undefined) return;
    sounds.forEach((triggerSound) => triggerSound(k, map));
};
