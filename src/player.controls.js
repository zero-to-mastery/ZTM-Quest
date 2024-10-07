import { scaleFactor } from './constants';
import { animations, stopCharacterAnims } from './utils/animation';
import { getCamScale } from './utils';

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
    k.onCustomEvent('dialog-displayed', () => {
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
        if (pressed.size === 0) return;
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

    const [map] = k.get('main_map');
    const camScale = getCamScale(k);

    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');

    const leftBounds = leftPanel.getBoundingClientRect();
    const rightBounds = rightPanel.getBoundingClientRect();
    const headerBounds = header.getBoundingClientRect();
    const footerBounds = footer.getBoundingClientRect();

    function getBoundaries() {
        return {
            left: -leftBounds.width / camScale,
            right: map.width * scaleFactor + rightBounds.width / camScale,
            top: -headerBounds.height / camScale,
            bottom: map.height * scaleFactor + footerBounds.height / camScale,
        };
    }

    function updatePos({ k, x, y }) {
        const boundaries = getBoundaries(k);

        const halfHeightScreen = k.height() / 2 / camScale;
        const halfWidthScreen = k.width() / 2 / camScale;
        const mapW = boundaries.right + Math.abs(boundaries.left);
        const mapH = boundaries.bottom + Math.abs(boundaries.top);

        if (k.width() / camScale > mapW) {
            const diff = k.width() / camScale - mapW;
            x = boundaries.left + halfWidthScreen - diff / 2;
        } else {
            if (x + halfWidthScreen > boundaries.right) {
                x = boundaries.right - halfWidthScreen;
            } else if (x - halfWidthScreen < boundaries.left) {
                x = boundaries.left + halfWidthScreen;
            }
        }

        if (k.height() / camScale > mapH) {
            const diff = k.height() / camScale - mapH;
            y = boundaries.bottom - halfHeightScreen - diff / 2;
        } else {
            const hViewPort =
                (k.height() - footerBounds.height - headerBounds.height) /
                camScale;

            const dy =
                halfHeightScreen -
                (k.height() - footerBounds.height) / camScale +
                hViewPort / 2;

            if (y + halfHeightScreen + dy > boundaries.bottom) {
                y = boundaries.bottom - halfHeightScreen;
            } else if (y - halfHeightScreen + dy < boundaries.top) {
                y = boundaries.top + halfHeightScreen;
            } else {
                y += dy;
            }
        }

        return [x, y];
    }

    k.onUpdate(() => {
        const updPos = updatePos({ k, ...player.pos });
        k.camPos(...updPos);
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
