export const interactionsForFish = (fish, k, map) => {
    k.onUpdate('fish', (gameObj) => {
        const hook = map.get('hook')[0];

        // Initialize speed once per fish if not already set
        if (!gameObj.fishSpeed) {
            gameObj.fishSpeed = Math.random() * 1.5 + 0.4; // Range: 0.4 to 1.9
        }

        if (map.pressedTwice && gameObj.isColliding(hook)) {
            k.destroy(gameObj);
            map.score += 20;
        } else {
            gameObj.pos.x += gameObj.fishSpeed;
        }

        if (gameObj.pos.x >= map.width || gameObj.pos.x < -15) {
            k.destroy(gameObj);
            return;
        }
    });
};
