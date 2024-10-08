import { k } from '../kplayCtx';
import { scaleFactor } from '../constants';

export function makeCoin(
    pos,
    startAnimation = 'idle-left',
) {

    k.loadSprite('coin', './assets/sprites/coin.png', {
        anims: {
            'idle-left': 0,
        },
    });

    return k.make([
        k.sprite('coin', { anim: startAnimation }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.pos(pos.x, pos.y),
        k.scale(1.25),
        k.anchor('center'),
        'coin',
    ]);
}
