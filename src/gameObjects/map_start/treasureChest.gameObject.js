import { scaleFactor } from '../../constants';

export const treasureChest = (k, map, spawnpoints) => {
    // Load the sprite for the Open treasure chest
    k.loadSprite(
        'treasureChestClosed',
        './assets/sprites/treasure_chest_closed.png',
        {
            sliceX: 1,
            sliceY: 1,
            anims: {
                idle: 0,
            },
        }
    );
    // Load the sprite for the Closed treasure chest open
    k.loadSprite(
        'treasureChestOpen',
        './assets/sprites/treasure_chest_open.png',
        {
            sliceX: 1,
            sliceY: 1,
            anims: {
                idle: 0,
            },
        }
    );

    // Load the chest opening sound
    k.loadSound('chestOpen', './assets/sounds/chest_opening.wav');

    const chestPosition = spawnpoints.treasureChest;

    if (!chestPosition) {
        return; // Prevent further execution
    }

    // Create a variable to track whether the chest is open
    let isOpen = false;

    // Create the treasure chest object
    const chestObj = k.make([
        k.sprite('treasureChestClosed', { anim: 'idle' }),
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

    // Add interaction logic to open the chest
    chestObj.onCollide('player', () => {
        if (!isOpen) {
            isOpen = true;
            // Change sprite to the open treasure chest
            chestObj.useSprite('treasureChestOpen');

            // Play the chest opening sound
            k.playSound('chestOpen');
        }
    });

    return chestObj;
};
