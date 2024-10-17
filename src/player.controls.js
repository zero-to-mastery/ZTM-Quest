import { scaleFactor } from './constants';
import { animations, stopCharacterAnims } from './utils/animation';
import { getCamScale } from './utils';
import { k } from './kplayCtx';
import { drawMinimap, toggleMinimap } from './utils/miniMap';

// Manage multiple pressed buttons
const pressed = new Set();

export const addPlayerControls = (player) => {
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
                ? player.state.energy >= 50
                    ? player.speed * 1.25
                    : player.speed * 1.1
                : player.state.energy >= 50
                  ? player.speed * 0.707106781188095 * 1.25 // Dot product for diagonal movement 45%
                  : player.speed * 0.707106781188095 * 1.1;

        player.move(moveDir.unit().scale(speed));
    });

    const [map] = k.get('main_map');
    const camScale = getCamScale(k);

    function updatePos({ k, x, y }) {
        let camX = x;
        let camY = y;

        // scaleFactor needs to multiplied with map dimensions to get values that are relative to player's position and speed.
        const mapWidth = map.width * scaleFactor;
        const mapHeight = map.height * scaleFactor;
        const mapCenterX = mapWidth / 2;
        const mapCenterY = mapHeight / 2;

        // canvas dimensions needs to be adjusted with respect to camScale.
        const canvasWidth = k.canvas.offsetWidth / camScale;
        const canvasHeight = k.canvas.offsetHeight / camScale;

        const maxDistX = mapWidth / 2 - canvasWidth / 2;
        const maxDistY = mapHeight / 2 - canvasHeight / 2;

        if (mapWidth > canvasWidth) {
            if (x > mapCenterX + maxDistX) {
                camX = mapCenterX + maxDistX;
            }
            if (x < mapCenterX - maxDistX) {
                camX = mapCenterX - maxDistX;
            }
        } else {
            camX = mapCenterX;
        }

        if (mapHeight > canvasHeight) {
            if (y > mapCenterY + maxDistY) {
                camY = mapCenterY + maxDistY;
            }
            if (y < mapCenterY - maxDistY) {
                camY = mapCenterY - maxDistY;
            }
        } else {
            camY = mapCenterY;
        }

        return [camX, camY];
    }

    k.onUpdate(() => {
        const updPos = updatePos({ k, ...player.pos });
        k.camPos(...updPos);
        drawMinimap(k, player); // Update minimap
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

    // Set up the button press event to toggle the minimap
    k.onButtonPress('map', () => {
        toggleMinimap(k);
    });

    // Only stop animations if no buttons are pressed
    k.onMouseRelease(() => pressed.size || stopCharacterAnims(player));

    player.onDestroy(() => {
        pressed.clear();
    });
};
