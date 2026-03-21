import { scaleFactor } from '../../constants';

export const ghosts = (k, map, spawnpoints) => {
    k.loadSprite('ghost', './assets/sprites/ghostIdle.png', {
        sliceX: 9,
        sliceY: 1,
        anims: {
            idle: { from: 0, to: 8, loop: true, speed: 3 },
        },
    });

    const ghostSpawnNames = [
        'ghost_1',
        'ghost_2',
        'ghost_3',
        'ghost_4',
        'ghost_5',
        'ghost_6',
    ];

    return ghostSpawnNames
        .filter((name) => spawnpoints[name])
        .map((name, index) => {
            const startPos = spawnpoints[name];
            const offset = index * 0.8;

            const ghost = k.make([
                k.sprite('ghost', { anim: 'idle' }),
                k.area({
                  shape: new k.Rect(k.vec2(0), 16, 16),
                }),
                k.anchor('center'),
                k.pos(startPos.x, startPos.y),
                k.scale(scaleFactor - 1),
                'ghost',
                {
                    startX: startPos.x / scaleFactor,
                    startY: startPos.y / scaleFactor,
                    offset,
                },
            ]);

            ghost.onUpdate(() => {
                   ghost.pos.x = ghost.startX + Math.sin(k.time() * 1.5 + ghost.offset) * 12;
                   ghost.pos.y = ghost.startY + Math.cos(k.time() * 1.2 + ghost.offset) * 4;
            });

            return ghost;
        });
};
