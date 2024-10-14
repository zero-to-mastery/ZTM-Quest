export const movingCars = (k, map, spawnpoints) => {
    // Load the car sprite from the sprite sheet
    k.loadSprite('car', './assets/sprites/moving_cars.png', {
        sliceX: 7,
        sliceY: 2,
        anims: {
            drive: { from: 0, to: 0, loop: true }, 
            turningPoint: { from: 5, to: 11, loop: true },
            down: { from: 12, to: 12, loop: true } 
        },
    });

    const street = {
        start: k.vec2(32, 200),
        turnPoint: k.vec2(455, 200),
        end: k.vec2(575, map.height * 2),
    };

    function spawnCar(street) {
        const car = k.add([
            k.sprite('car'),
            k.pos(street.start), 
            k.area(), 
            'car', 
            {
                state: 'right',
            },
        ]);

        car.play('drive');

        // Update car movement and animation based on its state
        car.onUpdate(() => {
            if (car.state === 'right') {
                car.move(160, 0); 

                if (car.pos.x >= street.turnPoint.x) {
                    car.state = 'down';
                    car.play('turningPoint'); 
                }

            } else if (car.state === 'down') {
                car.move(0, 160); 

                if (car.curAnim() === 'turningPoint' && car.frame === 11) { 
                    car.play('down'); 
                }

                if (car.pos.y > street.end.y - 100) {
                    k.destroy(car);
                } 
            }
        });

        return car;
    }

    const cars = [];

    k.loop(8, () => {
        const car = spawnCar(street);
        cars.push(car);
    });

    return cars;
};
