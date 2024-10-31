export const flyingBirds = (k, map) => {
    // Load the bird sprite from the sprite sheet
    k.loadSprite('bird', './assets/sprites/bird_flying.png', {
        sliceX: 6,
        sliceY: 1,
        anims: {
            fly: { from: 0, to: 5, loop: true },
        },
    });

    function spawnBird() {
        const bird = k.add([
            k.sprite('bird'),
            k.pos(k.vec2(0, 780)),
            k.area(),
        ]);

        bird.play('fly');

        //Update bird movement and animation based on its state
        bird.onUpdate(() => {
            bird.move(140, 0);

            if (bird.pos.x > 1900) {
                k.destroy(bird);
            }
        });

        return bird;
   }

    const birds = [];

    k.loop(8, () => {
        const bird = spawnBird();
        birds.push(bird);
    });

    return birds;

 };
