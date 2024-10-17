export const music = (k, map) => {
    if (!k.getSound('forest_junction')) {
        k.loadMusic('forest_junction', './assets/sounds/forest_junction.mp3');
    }

    const music = k.play('forest_junction', {
        loop: true,
        volume: 0.1,
    });

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
