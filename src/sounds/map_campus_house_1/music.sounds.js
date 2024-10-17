export const music = (k, map) => {
    if (!k.getSound('campus_house_1')) {
        k.loadMusic('campus_house_1', './assets/sounds/campus_house_1.mp3');
    }

    const music = k.play('campus_house_1');

    music.onEnd(() => {
        music.play();
    });

    k.onSceneLeave(() => {
        music.stop();
    });
};
