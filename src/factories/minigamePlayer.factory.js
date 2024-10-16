import { k } from '../kplayCtx';

export const makePlayer = () => {
    if (!k.getSprite('player_fishing')) {
        k.loadSprite(
            'player_fishing',
            './assets/sprites/characters_fishing.png',
            {
                sliceX: 10,
                sliceY: 20,
                anims: {
                    'idle-down': 20,
                    'walk-down': { from: 24, to: 25, loop: true, speed: 4 },
                    'idle-side': 22,
                    'walk-side': { from: 28, to: 29, loop: true, speed: 4 },
                    'idle-up': 21,
                    'walk-up': { from: 26, to: 27, loop: true, speed: 4 },
                },
            }
        );
    }

    return k.make([
        k.sprite('player_fishing', { anim: 'idle-down' }),
        k.pos(),
        k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
        k.body(),
        k.anchor('center'),
        k.layer('player'),
        'player',
    ]);
};
