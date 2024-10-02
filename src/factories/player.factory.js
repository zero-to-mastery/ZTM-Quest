import { k } from '../kplayCtx';
import { scaleFactor, speedByScaleFactor } from '../constants';
import { getGameState, setGameState } from '../utils/gameState';

export function makePlayer(playerProps = {}, customScale = scaleFactor) {
    if (!k.getSprite('player')) {
        k.loadSprite('player', './characters.png', {
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
    }

    const playerState = {
        set: function(target, key, value) {
            const gameState = getGameState();
            gameState.player[key] = value;
            setGameState(gameState);
            return true;
        }
    }
    const state = new Proxy({
        ...playerProps
    }, playerState);

    const player = k.make([
        k.sprite('player', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body(),
        k.anchor('center'),
        k.pos(),
        k.scale(customScale),
        {
            speed: speedByScaleFactor,
            direction: 'down',
            isInDialog: false,
            collectedCoins: 0,
            score: 0,
            state: state,
        },
    ]);

    return player;
}
