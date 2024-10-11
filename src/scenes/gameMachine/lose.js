import { k } from '../../kplayCtx'
import { showCanvasFrame } from '../../utils';

export const loseScreen = ({ title, gameRestartSceneName, gameExitSceneName, score }) => {

  const center = k.center();

  const exitGame = () => {
    showCanvasFrame();
    k.setGravity(0);
    k.go(gameExitSceneName);
  }

  const restartGame = () => {
    k.go(gameRestartSceneName);
  }

  k.play('game-over-sound');

  const gameOverTxt = k.add([
    k.text('Game Over', { size: 64, font: 'pixelFont' }),
    k.pos(center.x, center.y - 100),
    k.anchor('center')
  ]);

  const scoreTxt = k.add([
    k.text(`Score: ${score}`, { size: 48, font: 'pixelFont' }),
    k.pos(center.x, center.y - 50),
    k.scale(1),
    k.anchor('center'),
  ]);

  const restartButton = generateButton('Restart', center.x, center.y + 50, [0, 255, 0]);
  const exitButton = generateButton('Exit', center.x, center.y + 120, [255, 0, 0]);

  exitButton.onClick(exitGame);
  restartButton.onClick(restartGame);



  k.onKeyPress('escape', exitGame);
  k.onKeyPress('space', restartGame);

  k.onResize(() => {
    const center = k.center();

    gameOverTxt.pos = k.vec2(center.x, center.y - 100);
    scoreTxt.pos = k.vec2(center.x, center.y - 50);
    restartButton.pos = k.vec2(center.x, center.y + 50);
    exitButton.pos = k.vec2(center.x, center.y + 120);
  })
}

function generateButton(btnText, x, y, bgColor = [255, 255, 255], color = [0, 0, 0]) {

  const button = k.add([
    k.rect(200, 60),
    k.pos(x, y),
    k.anchor('center'),
    k.color(...bgColor),
    k.area(),
    'button',
  ]);

  button.add([
    k.text(btnText, { size: 24, font: 'pixelFont' }),
    k.anchor('center'),
    k.color(...color),
  ]);

  return button;
}