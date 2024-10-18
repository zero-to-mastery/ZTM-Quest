export const music = (k, map) => {
    if (!k.getSound('forest')) {
        k.loadMusic('forest', './assets/sounds/forest.mp3');
    }

    const music = k.play('forest', {
        loop: true,
    });

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
