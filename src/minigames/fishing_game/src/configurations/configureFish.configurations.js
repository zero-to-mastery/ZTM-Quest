export const configureFish = (k, map) => {
    k.onUpdate("fish", (gameObj) => {
      const hook = map.get("hook")[0];
      const randomSpeed = Math.random() * 4 + 1;
      if (map.pressedTwice && gameObj.isColliding(hook)) {
        k.destroy(gameObj);
        map.score += 20;
      } else {
        gameObj.pos.x += randomSpeed;
      }
  
      if (gameObj.pos.x >= k.canvas.width || gameObj.pos.x < -15) {
        k.destroy(gameObj);
        return;
      }
    });
  };