import { scaleFactor } from '../../constants';
// Arcade machine interaction
import { displayPermissionBox } from '../../utils';

export const interactionWithGameMachine8 = (player, k) => {
    // Check collision with the game machine
    player.onCollide('game_machine_8', async () => {
        player.isInDialog = true;
        const wantsToPlay = await displayPermissionBox({
            k,
            player,
            text: ['Do you want to play ROBO RUNNER 🏃‍➡️?'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (wantsToPlay) {
            initGame(k);
        } else {
            player.isInDialog = false;
        }
    });
};

export function initGame(k) {
    k.debug.log('Mini-Game started!');

    const FLOOR_HEIGHT = 48;
    const JUMP_FORCE = 800;
    const SPEED = 480;
    const GRAVITY = 2400;

    k.scene('miniGame', () => {
        // Set gravity
        k.setGravity(GRAVITY);

        // Set background color
        k.setBackground(141, 183, 255);

        k.loadSprite('runner', 'characters.png', {
            sliceX: 10,
            sliceY: 20,
            anims: {
                run: { from: 118, to: 119, loop: true, speed: 4 }, // Running animation
            },
        });

        const player = k.add([
            k.sprite('runner', { anim: 'run' }),
            k.pos(80, 40),
            k.area(),
            k.body(),
            k.scale(scaleFactor),
        ]);

        // Player jump logic
        k.onKeyPress('space', () => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        k.onClick(() => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });

        k.add([
            k.rect(k.width(), FLOOR_HEIGHT),
            k.pos(0, k.height()),
            k.anchor('botleft'),
            k.outline(4),
            k.area(),
            k.body({ isStatic: true }),
            k.color(132, 101, 236),
        ]);

        // Function to spawn trees
        function spawnTree() {
            k.add([
                k.rect(48, k.rand(32, 96)),
                k.area(),
                k.outline(4),
                k.pos(k.width(), k.height() - FLOOR_HEIGHT),
                k.anchor('botleft'),
                k.color(238, 143, 203),
                k.move(k.LEFT, SPEED),
                'tree',
            ]);

            k.wait(k.rand(1.5, 3), () => {
                spawnTree();
            });
        }

        spawnTree();

        // Handle collision and game over logic
        let score = 0;
        const scoreLabel = k.add([k.text(score), k.pos(68, 100)]);

        k.onUpdate(() => {
            score++;
            scoreLabel.text = score;
        });

        player.onCollide('tree', () => {
            k.addKaboom(player.pos);
            k.shake();
            k.go('lose', score);
        });
        k.onResize(() => {
            const scaleFactor = k.width() / k.height();
            if (scaleFactor < 1) {
                dino.scaleTo(1);
            } else {
                dino.scaleTo(scaleFactor);
            }
            floor.width = k.width();
        });
    });

    k.scene('lose', (score) => {
        k.setGravity(0);
        //add "game over" text
        k.add([k.text('Game Over'), k.pos(k.center()), k.anchor('center')]);
        // display score
        k.add([
            k.text(score),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.scale(2),
            k.anchor('center'),
        ]);

        const playAgainButton = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 140),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        const exitButton = k.add([
            k.text('Exit'),
            k.pos(k.width() / 2, k.height() / 2 + 200),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        playAgainButton.onClick(() => {
            initGame(k); // Restart the game
        });
        exitButton.onClick(() => {
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        });
    });

    k.go('miniGame');
}
