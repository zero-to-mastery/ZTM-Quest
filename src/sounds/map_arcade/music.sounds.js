export const music = (k, map) => {
    if (!k.getSound('arcade')) {
        k.loadMusic('arcade', './assets/sounds/arcade.mp3');
    }

    const music = k.play('arcade');

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
