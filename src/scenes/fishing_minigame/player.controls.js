import { k } from '../../kplayCtx';
import { makeFish } from '../../factories/fish.factory';

export const addPlayerControls = (player, hook, map) => {
    k.onKeyDown('left', () => {
        if (player.vel.x < 0) {
            return;
        }
        player.vel.x -= k.dt() * 3600;
    });

    k.onKeyRelease('left', () => {
        player.vel.x = 0;
    });

    k.onKeyDown('right', () => {
        if (player.vel.x > 0) {
            return;
        }
        player.vel.x += k.dt() * 3600;
    });

    k.onKeyRelease('right', () => {
        player.vel.x = 0;
    });

    k.onKeyPress('space', () => {
        if (map.pressedTwice) return;
        if (map.pressed) {
            hook.vel.y = -300;
            map.pressed = false;
            map.pressedTwice = true;
            return;
        }
        hook.vel.y = 300;
        map.pressed = true;
    });

    // For mobile screens
    k.onClick('controls', () => {
        if (map.pressedTwice) return;
        if (map.pressed) {
            hook.vel.y = -300;
            map.pressed = false;
            map.pressedTwice = true;
            return;
        }
        hook.vel.y = 300;
        map.pressed = true;
    });

    k.onClick('quitText', () => {
        k.go('forest', 'spawn_bottom');
    });

    k.onKeyPress('escape', () => {
        k.go('forest', 'spawn_bottom');
    });

    player.onCollide((gameObj, col) => {
        if (gameObj.pos.x > 0) {
            col.source.pos.x -= 1;

            return;
        }
        col.source.pos.x += 1;
    });

    hook.onCollide((gameObj, col) => {
        if (gameObj.tags.includes('grass')) {
            hook.vel.y = 0;
            hook.pos = k.vec2(player.pos.x, player.pos.y + 32);
            map.pressed = false;
            map.pressedTwice = false;
        } else if (gameObj.tags.includes('sea')) {
            hook.vel.y = -300;
            map.pressed = true;
            map.pressedTwice = true;
        }
    });

    hook.onUpdate(() => {
        hook.pos.x = player.pos.x;
    });

    // Game Configuration that spawns fish randomly
    k.onUpdate(() => {
        map.fishSpawnTimer -= k.dt();

        if (map.fishSpawnTimer <= 0) {
            const fish = makeFish(map);
            map.add(fish);

            map.fishSpawnTimer = Math.random() * 4 + 1;
        }
    });
};
