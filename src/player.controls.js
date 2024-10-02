import { animations, stopCharacterAnims } from './utils/animation';

// Manage multiple pressed buttons
const pressed = new Set();

export const addPlayerControls = (k, player) => {
    k.onButtonPress(
        ['up', 'down', 'left', 'right'],
        (dir) => player.isInDialog || pressed.add(dir)
    );
    k.onButtonRelease(
        ['up', 'down', 'left', 'right'],
        (dir) => player.isInDialog || pressed.delete(dir)
    );
    // Control what happens when a dialog starts
    k.canvas.addEventListener('dialogueDisplayed', () => {
        pressed.clear();
        // TODO: should it look at the character?
        stopCharacterAnims(player);
    });

    k.onButtonPress(['up', 'down'], (dir) => {
        if (player.isInDialog) return;
        player.direction = dir;
        player.play(animations[dir]);
    });
    k.onButtonPress(['left', 'right'], (dir) => {
        if (player.isInDialog) return;
        player.direction = dir;
        player.play(animations[dir]);
        if (dir === 'left' && !player.flipX) player.flipX = true;
        if (dir === 'right' && player.flipX) player.flipX = false;
    });

    // When a button is released, check if there are other buttons pressed
    k.onButtonRelease(['up', 'down', 'left', 'right'], (dir) => {
        stopCharacterAnims(player);
        pressed.delete(dir);
        if (!pressed.size) return;
        if (player.isInDialog) return;

        const nextDir = [...pressed].at(-1);
        player.direction = nextDir;
        const a = animations[nextDir];
        if (player.curAnim() !== a) player.play(a);
    });

    k.onButtonDown(['up', 'down', 'left', 'right'], (dir) => {
        if (player.isInDialog) return;
        // If three buttons are pressed, the player should not move
        if (pressed.size > 2) return;
        // Also, if opposite buttons are pressed, the player should not move
        if (pressed.has('left') && pressed.has('right')) return;
        if (pressed.has('up') && pressed.has('down')) return;

        // Move the player
        const dirX = pressed.has('left') ? -1 : pressed.has('right') ? 1 : 0;
        const dirY = pressed.has('up') ? -1 : pressed.has('down') ? 1 : 0;
        const moveDir = k.vec2(dirX, dirY);
        const speed =
            pressed.size === 1
                ? player.speed
                : // Dot product for diagonal movement 45%
                  player.speed * 0.707106781188095; // 1 / sqrt(2)

        player.move(moveDir.unit().scale(speed));
    });

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== 'left' || player.isInDialog || pressed.size) return;

        const worldMousePos = k.toWorld(k.mousePos());
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos);

        const lowerBound = 50;
        const upperBound = 125;

        if (
            mouseAngle > lowerBound &&
            mouseAngle < upperBound &&
            player.curAnim() !== animations.up
        ) {
            player.play(animations.up);
            player.direction = 'up';
            return;
        }

        if (
            mouseAngle < -lowerBound &&
            mouseAngle > -upperBound &&
            player.curAnim() !== animations.down
        ) {
            player.play(animations.down);
            player.direction = 'down';
            return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== animations.right)
                player.play(animations.right);
            player.direction = 'right';
            return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== animations.left)
                player.play(animations.left);
            player.direction = 'left';
            return;
        }
    });
    // Only stop animations if no buttons are pressed
    k.onMouseRelease(() => pressed.size || stopCharacterAnims(player));
};
