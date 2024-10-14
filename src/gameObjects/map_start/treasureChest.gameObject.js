import { scaleFactor } from '../../constants';

export const treasureChest = (k, map) => {
    k.loadSprite(
        'treasureChestClosed',
        './assets/sprites/treasure_chest_closed.png'
    );
    k.loadSprite(
        'treasureChestOpen',
        './assets/sprites/treasure_chest_open.png'
    );

    k.loadSound('chestOpen', './assets/sounds/chest_opening.wav');

    const chestPosition = { x: 200, y: 100 };

    let isOpen = false;

    const chestObj = k.make([
        k.sprite('treasureChestClosed'),
        k.area(),
        k.pos(
            map.pos.x + chestPosition.x / scaleFactor,
            map.pos.y + chestPosition.y / scaleFactor
        ),
        k.scale(0.5),
        'treasureChest',
    ]);

    chestObj.onCollide('player', () => {
        if (!isOpen) {
            isOpen = true;
            k.play('chestOpen');

            chestObj.use(k.sprite('treasureChestOpen'));
            const msg = k.add([
                k.text('ohh you found the secret treasure!', {
                    size: 15,
                }),
                k.pos(chestObj.pos.x, chestObj.pos.y + 20),
            ]);

            k.wait(4, () => {
                msg.destroy();
            });
        }
    });

    return chestObj;
};
