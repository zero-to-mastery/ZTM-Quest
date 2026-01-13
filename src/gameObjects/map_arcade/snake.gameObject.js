/*
import { scaleFactor } from '../../constants';
///still cannot "spawn" my game object
export const snake = (k, map, spawnpoints) => {
    k.loadSprite('snake', './assets/sprites/snakeArcade.png', {
        sliceX: 10,
        sliceY: 20,
    });
    /*k.onDraw(() => {
    k.drawSprite({
        sprite: k.loadSprite('snakeArcade', './assets/sprites/snakeArcade.png'), //Sorry, dart-style :->D
        pos: k.vec2(100, 200),
    });
});

   return k.make([
        k.sprite('snakeArcade'),
        k.area({
            shape: new k.Rect(k.vec2(0), 117, 159),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(map.pos.x + spawnpoints.player.x, map.pos.y + spawnpoints.player.y),
        k.scale(scaleFactor + 0.5),
        'snake',
    ]);
};
*/