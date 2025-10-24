import { characters } from '../constants';

export const changePlayerSprite = (
    name,
    startAnimation = 'idle-down',
    k,
    player
) => {
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
    player.use(k.sprite('player', { anim: startAnimation }));
};
