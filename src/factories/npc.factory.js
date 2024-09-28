import { k } from '../kplayCtx';
import { scaleFactor } from '../constants';
import { getRandomCharacter } from '../utils/sprites';

export function makeNpc(
    targetDestination,
    pos,
    startAnimation = 'idle-down',
    additionalTag = 'npc'
) {
    const randomCharacter = getRandomCharacter();
    const npcKey = `npc_${randomCharacter.name}`;

    const [idleDown, walkDown, idleSide, walkSide, idleUp, walkUp] =
        randomCharacter.frames;

    if (!k.getSprite(npcKey)) {
        k.loadSprite(npcKey, './characters.png', {
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
    }

    return k.make([
        k.sprite(npcKey, { anim: startAnimation }),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.pos(pos.x, pos.y),
        k.scale(scaleFactor),
        k.anchor('center'),
        k.state('idle', ['idle', 'move', 'end']),
        npcKey,
        additionalTag,
        {
            targetDestination,
        },
    ]);
}
