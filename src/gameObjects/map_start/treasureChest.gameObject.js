// src/gameObjects/map_start/treasureChest.gameObject.js
import { scaleFactor } from '../../constants';

export const treasureChest = (k, map, spawnpoints) => {
    // Load the sprite for the treasure chest
    k.loadSprite('treasureChest', './assets/sprites/treasure_chest.png', {
        sliceX: 1,
        sliceY: 1,
        anims: {
            idle: 0,
        },
    });

    // Create the treasure chest object
    const chestObj = k.make([
        k.sprite('treasureChest', { anim: 'idle' }),
        k.area({
            shape: new k.Rect(k.vec2(0), 32, 32), // Adjust dimensions
        }),
        k.body({ isStatic: true }), // Set to static if it shouldn’t move
        k.anchor('center'),
        // make sure to define it in Tiled
        k.pos(
            spawnpoints.treasureChest.x / scaleFactor,
            spawnpoints.treasureChest.y / scaleFactor
        ),
        k.scale(1.0), // Adjust scale if necessary
        k.offscreen({ hide: false, distance: 10 }), // Optional
        'treasureChest', // Tag for identifying this object type
    ]);

    return chestObj;
};
