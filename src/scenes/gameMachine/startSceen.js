import { k } from '../../kplayCtx';
import { hideCanvasFrame } from '../../utils';

export const gameStartScreen = ({ title, gameSceneName }) => {
    const center = k.center();
    hideCanvasFrame();

    k.loadSound('game-over-sound', './assets/sprites/game_over.wav');
    k.loadSound('button-click-sound', './assets/sprites/jump.wav');

    const titleTxt = k.add([
        k.text(title, { size: 64, font: 'pixelFont' }),
        k.pos(center.x, center.y - 100),
        k.anchor('center'),
    ]);

    const startBtnTxt = k.make([
        k.text('Start Game', { size: 34, font: 'pixelFont' }),
        k.anchor('center'),
        k.color(0, 0, 0),
    ]);

    const startButton = k.add([
        k.rect(startBtnTxt.width + 20, 80),
        k.pos(center),
        k.anchor('center'),
        k.color(0, 255, 0),
        k.area(),
        'button',
    ]);

    startButton.add(startBtnTxt);

    startButton.onClick(() => {
        k.go(gameSceneName);
    });

    k.onKeyPress('space', () => {
        k.go(gameSceneName);
    });

    k.onResize(() => {
        const center = k.center();

        titleTxt.pos = k.vec2(center.x, center.y - 100);
        startButton.pos = k.vec2(center.x, center.y + 50);
    });
};
