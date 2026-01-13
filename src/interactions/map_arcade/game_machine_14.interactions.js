// 2025 Hacktoberfest PR by Burin-Zhargal Papaev
// New arcade game: Snake.
//Never able to invoke because struggle to add the new sprite gameobject properly.
/*import { displayDialogue } from '../../utils';

export const interactionWithGameMachine14 = (player, k, map) => {
    k.onCollide('player', 'snake', () => {
        showCustomPrompt(
            'Do you want to play Snake Videogame?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting Snake VideoGame... Good luck!'],
                        onDisplayEnd: () => {
                            startSnakeScene(k);
                            k.go('snake');
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
                    });
                }
            }
        );
    });
};

function showCustomPrompt(message, options, callback) {
    document.getElementById('prompt-message').textContent = message;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable


        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };


        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent the default behavior
                callback(option);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });


    document.getElementById('custom-prompt').style.display = 'flex';

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}


function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}

export function startSnakeScene(k) {
  const { add, rect, color, pos, area, anchor, outline, text, onKeyPress, loop, wait, rand, width, height, go } = k;

  k.scene('snake', () => {
    // Config
    const CELL = 16;
    const GRID_W = Math.floor(width() / CELL);
    const GRID_H = Math.floor(height() / CELL);
    const SPEED = 0.12; // seconds per step

    // State
    let dir = k.vec2(1, 0);
    let nextDir = dir.clone();
    let snake = [k.vec2(Math.floor(GRID_W / 2), Math.floor(GRID_H / 2))];
    let grow = 0;
    let score = 0;
    let alive = true;

    // UI
    const ui = add([
      text(`Score: 0`),
      pos(8, 8),
      anchor('topleft'),
      color(255, 255, 255),
      outline(2, k.rgb(0, 0, 0)),
      { updateScore: (s) => (ui.text = `Score: ${s}`) },
    ]);

    // Helpers
    const toPx = (v) => pos(v.x * CELL + CELL / 2, v.y * CELL + CELL / 2);

    // Renderers
    function drawSnake() {
      // Clear existing snake parts
      for (const n of get('snake-part')) n.destroy();

      // Redraw
      snake.forEach((cell, i) => {
        add([
          rect(CELL - 2, CELL - 2),
          toPx(cell),
          anchor('center'),
          color(i === 0 ? k.rgb(0, 200, 0) : k.rgb(0, 150, 0)),
          outline(2, k.rgb(0, 0, 0)),
          'snake-part',
        ]);
      });
    }

    // Food
    let foodPos = null;
    let foodObj = null;
    function placeFood() {
      // choose empty cell
      while (true) {
        const fx = Math.floor(rand(1, GRID_W - 1));
        const fy = Math.floor(rand(1, GRID_H - 1));
        const conflict = snake.some((s) => s.x === fx && s.y === fy);
        if (!conflict) {
          foodPos = k.vec2(fx, fy);
          if (foodObj) foodObj.destroy();
          foodObj = add([
            rect(CELL - 2, CELL - 2),
            toPx(foodPos),
            anchor('center'),
            color(220, 60, 60),
            outline(2, k.rgb(0, 0, 0)),
            'food',
          ]);
          break;
        }
      }
    }

    function gameOver() {
      alive = false;
      add([
        text(`Game Over\nScore: ${score}\n\nPress Enter to return`),
        pos(width() / 2, height() / 2),
        anchor('center'),
        color(255, 255, 255),
        outline(2, k.rgb(0, 0, 0)),
      ]);

      const returnTo = 'game'; 
      k.onKeyPress('enter', () => go(returnTo));
      // Also auto-return after 3 seconds
      wait(3, () => go(returnTo));
    }

    // Input
    const dirs = {
      left: k.vec2(-1, 0),
      right: k.vec2(1, 0),
      up: k.vec2(0, -1),
      down: k.vec2(0, 1),
    };
    for (const key in dirs) {
      onKeyPress(key, () => {
        const d = dirs[key];
        // Prevent 180° reverse
        if (snake.length > 1 && d.x === -dir.x && d.y === -dir.y) return;
        nextDir = d.clone();
      });
    }

    // Init
    drawSnake();
    placeFood();

    // Step loop
    loop(SPEED, () => {
      if (!alive) return;

      // advance direction chosen since last step
      dir = nextDir.clone();

      // compute new head
      const head = snake[0];
      const newHead = k.vec2(head.x + dir.x, head.y + dir.y);

      // wall collision
      if (newHead.x < 0 || newHead.y < 0 || newHead.x >= GRID_W || newHead.y >= GRID_H) {
        gameOver();
        return;
      }

      // self collision
      if (snake.some((s, i) => i !== 0 && s.x === newHead.x && s.y === newHead.y)) {
        gameOver();
        return;
      }

      // move
      snake.unshift(newHead);
      if (grow > 0) {
        grow--;
      } else {
        snake.pop();
      }

      // eat
      if (foodPos && newHead.x === foodPos.x && newHead.y === foodPos.y) {
        score += 1;
        ui.updateScore(score);
        grow += 1;
        placeFood();
      }

      drawSnake();
    });
  });
}*/
