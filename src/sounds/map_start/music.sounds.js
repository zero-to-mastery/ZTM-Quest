export const music = (k, map) => {
    if (!k.getSound('start')) {
        k.loadMusic('start', './assets/sounds/start.mp3');
    }

    const music = k.play('start', {
        loop: true,
        volume: 0.5,
    });

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
