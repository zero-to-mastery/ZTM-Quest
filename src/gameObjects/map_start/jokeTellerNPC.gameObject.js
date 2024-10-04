import { characters, scaleFactor } from '../../constants';

const duke = characters[4];
const [idleDown, walkDown, idleSide, walkSide, idleUp, walkUp] = duke.frames;

export const jokeTellerNPC = (k, map, spawnpoints) => {
    k.loadSprite('jokeTeller', './characters.png', {
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

    const spawnPoint = spawnpoints.jokeTeller || { x: 180, y: 467 };

    return k.make([
        k.sprite('jokeTeller', { anim: 'idle-side' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.pos(spawnPoint.x, spawnPoint.y),
        k.scale(scaleFactor),
        k.anchor('center'),
        k.offscreen({ hide: true, distance: 10 }),
        'jokeTellerNpc',
    ]);
};
