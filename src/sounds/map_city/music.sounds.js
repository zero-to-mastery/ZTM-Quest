export const music = (k, map) => {
    if (!k.getSound('city')) {
        k.loadMusic('city', './assets/sounds/city.mp3');
    }
    const music = k.play('city', {
        loop: true,
        volume: 0.25,
    });

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
