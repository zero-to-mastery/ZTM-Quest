export function loadFishingAssets(k) {
    // Load Sprites
    k.loadSprite('hook', './assets/sprites/hook.png');
    k.loadSprite('player_fishing', './assets/sprites/characters_fishing.png', {
        sliceX: 10,
        sliceY: 20,
        anims: {
            'idle-down': 20,
            'walk-down': { from: 24, to: 25, loop: true, speed: 4 },
            'idle-side': 22,
            'walk-side': { from: 28, to: 29, loop: true, speed: 4 },
            'idle-up': 21,
            'walk-up': { from: 26, to: 27, loop: true, speed: 4 },
        },
    });

    k.loadSprite('fishingrod', './assets/sprites/fishingrod.png');
    // k.loadSprite('fishing_map', './exports/maps/map_forest_fishing.png');

    k.loadSpriteAtlas('./assets/sprites/fish.png', {
        fish_1: {
            x: 16,
            y: 0,
            width: 16,
            height: 16,
        },
        fish_2: {
            x: 32,
            y: 0,
            width: 16,
            height: 16,
        },
        fish_3: {
            x: 48,
            y: 0,
            width: 16,
            height: 16,
        },
        fish_4: {
            x: 64,
            y: 0,
            width: 16,
            height: 16,
        },
    });
}
