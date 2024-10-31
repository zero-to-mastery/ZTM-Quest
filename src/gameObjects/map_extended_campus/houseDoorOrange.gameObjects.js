// Create a house door when player owns a house
import { scaleFactor } from '../../constants';
import { getGameState } from '../../utils/gameState';

export const houseDoorOrange = (k, map, spawnpoints) => {
    const gameState = getGameState();
    if (!gameState.player.housesOwned.includes('Orange')) {
        return k.make([]);
    }

    k.loadSprite(
        'houseDoorOrange',
        './assets/sprites/campus_house_door_1.png',
        {
            frame: 1,
        }
    );

    return k.make([
        k.sprite('houseDoorOrange'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + spawnpoints.doorOpenOrange.x / scaleFactor,
            map.pos.y + spawnpoints.doorOpenOrange.y / scaleFactor
        ),
        k.offscreen({ hide: true, distance: 10 }),
        'houseDoorOrange',
    ]);
};
