import { characters, scaleFactor, speedByScaleFactor } from '../constants';
import { getGameState, setGameState } from '../utils/gameState';

export function makePlayer(k, playerProps = {}, customScale = scaleFactor) {
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
    }

    const changePlayer = (name, startAnimation = 'idle-down') => {
        const chosenCharacter = characters.find(
            (character) => character.name === name
        );
        const [idleDown, walkDown, idleSide, walkSide, idleUp, walkUp] =
            chosenCharacter.frames;

        k.loadSprite('player', './assets/sprites/characters.png', {
            sliceX: 10,
            sliceY: 20,
            anims: {
                'idle-down': idleDown,
                'walk-down': {
                    from: walkDown,
                    to: walkDown + 1,
                    loop: true,
                    speed: 6,
                },
                'idle-side': idleSide,
                'walk-side': {
                    from: walkSide,
                    to: walkSide + 1,
                    loop: true,
                    speed: 6,
                },
                'idle-up': idleUp,
                'walk-up': {
                    from: walkUp,
                    to: walkUp + 1,
                    loop: true,
                    speed: 6,
                },
            },
        });
        // Update the player's sprite to use the new character
        player.use(k.sprite('player', { anim: startAnimation }));
    };

    const playerState = {
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
        {
            ...playerProps,
        },
        playerState
    );

    const player = k.make([
        k.sprite('player', { anim: 'idle-down' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 10, 10),
        }),
        k.layer('player'),
        k.body(),
        k.anchor('center'),
        k.pos(),
        k.scale(customScale),
        k.z(1),
        {
            speed: speedByScaleFactor,
            direction: 'down',
            isInDialog: false,
            collectedCoins: 0,
            score: 0,
            state: state,
            changePlayer,
        },
        'player',
    ]);

    return player;
}
