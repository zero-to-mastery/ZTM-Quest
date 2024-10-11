export const configurePlayer = (k, player) => {
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

    player.onCollide((gameObj, col) => {
        if (gameObj.pos.x > 0) {
            col.source.pos.x -= 1;

            return;
        }
        col.source.pos.x += 1;
    });
};
