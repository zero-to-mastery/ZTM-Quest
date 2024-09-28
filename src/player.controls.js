import { stopCharacterAnims } from './utils/animation';

export const addPlayerControls = (k, player) => {
    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== 'left' || player.isInDialog) return;

        const worldMousePos = k.toWorld(k.mousePos());
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos);

        const lowerBound = 50;
        const upperBound = 125;

        if (
            mouseAngle > lowerBound &&
            mouseAngle < upperBound &&
            player.curAnim() !== 'walk-up'
        ) {
            player.play('walk-up');
            player.direction = 'up';
            return;
        }

        if (
            mouseAngle < -lowerBound &&
            mouseAngle > -upperBound &&
            player.curAnim() !== 'walk-down'
        ) {
            player.play('walk-down');
            player.direction = 'down';
            return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== 'walk-side') player.play('walk-side');
            player.direction = 'right';
            return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== 'walk-side') player.play('walk-side');
            player.direction = 'left';
            return;
        }
    });
    k.onMouseRelease(() => stopCharacterAnims(player));
};
