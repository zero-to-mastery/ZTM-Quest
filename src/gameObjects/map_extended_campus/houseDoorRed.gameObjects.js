// Create a house door when player owns a house
import { getGameState } from '../../utils/gameState';
import { scaleFactor } from '../../constants';

export const houseDoorRed = (k, map, spawnpoints) => {
    const gameState = getGameState();
    if (!gameState.player.housesOwned.includes('Red')) {
        return k.make([]);
    }

    k.loadSprite('houseDoorRed', './assets/sprites/campus_house_door_1.png', {
        frame: 1,
    });

    return k.make([
        k.sprite('houseDoorRed'),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
        }),
        k.body({ isStatic: true }),
        k.anchor('center'),
        k.pos(
            map.pos.x + spawnpoints.doorOpenRed.x / scaleFactor,
            map.pos.y + spawnpoints.doorOpenRed.y / scaleFactor
        ),
        k.offscreen({ hide: true, distance: 10 }),
        'houseDoorRed',
    ]);
};
