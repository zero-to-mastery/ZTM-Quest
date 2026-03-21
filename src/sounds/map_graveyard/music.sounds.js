export const music = (k, map) => {
    if (!k.getSound('graveyard')) {
        k.loadMusic('graveyard', './assets/sounds/graveyard.mp3');
    }

    const music = k.play('graveyard', {
        loop: true,
    });

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
