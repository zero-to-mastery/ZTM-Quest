import { scaleFactor } from '../../constants'
import { makeCoin } from '../../factories/coin.factory';

export const coins = (k, map, spawnpoints) => {
    const coinStore = [];
    const coinPattern = new RegExp(/coin/g);
    const coins = map
        .get('*')
        .filter(
            (obj) =>
                obj.tags.filter((tag) => new RegExp(coinPattern).test(tag))
                    .length > 0
        );
        
    for (const coin of coins) {
        // Create coins
        const newCoin = makeCoin(
            k.vec2(
                (map.pos.x + coin.pos.x + 6) * scaleFactor,
                (map.pos.y + coin.pos.y + 12) * scaleFactor
            ),
        );

        coinStore.push(newCoin);
    }

    return coinStore;
};
