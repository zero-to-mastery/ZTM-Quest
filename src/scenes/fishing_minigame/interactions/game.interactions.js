import { makeFish } from '../factories/fish.factory';

export const gameInteractions = (player, k, map) => {
    // Game Configuration that spawns fish randomly
    k.onUpdate(() => {
        map.fishSpawnTimer -= k.dt();

        if (map.fishSpawnTimer <= 0) {
            const fish = makeFish(map);
            map.add(fish);

            map.fishSpawnTimer = Math.random() * 4 + 1;
        }
    });
};
