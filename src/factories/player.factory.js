import { k } from '../kplayCtx';
import { scaleFactor } from '../constants';
import { getGameState, setGameState } from '../utils/gameState';

export function makePlayer(playerState = {}, customScale = scaleFactor) {
    if (!k.getSprite('player')) {
        k.loadSprite('player', './assets/sprites/characters.png', {
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
        });

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

    const playerStateHandler = {
        set: function (target, key, value) {
            const gameState = getGameState();
            gameState.player[key] = value;
            setGameState(gameState);
            return true;
        },
        get: function (target, key) {
            const gameState = getGameState();
            return gameState.player[key];
        },
    };
    const state = new Proxy(
        // target
        playerState,
        // handler
        playerStateHandler
    );

    const player = k.make([
        k.sprite('player', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body(),
        k.anchor('center'),
        k.pos(),
        k.scale(customScale),
        k.layer('player'),
        'player',
        {
            state,
        },
    ]);

    return player;
}
