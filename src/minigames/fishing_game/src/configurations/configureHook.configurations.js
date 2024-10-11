export const configureHook = (k, hook, map) => {
    const player = map.get("player")[0];
    k.onKeyPress("space", () => {
      if (map.pressedTwice) return;
      if (map.pressed) {
        hook.vel.y = -300;
        map.pressed = false;
        map.pressedTwice = true;
        return;
      }
      hook.vel.y = 300;
      map.pressed = true;
    });

    hook.onCollide((gameObj, col) => {
      if (gameObj.tags.includes("grass")) {
        hook.vel.y = 0;
        hook.pos = k.vec2(player.pos.x, player.pos.y + 32);
        map.pressed = false;
        map.pressedTwice = false;
      } else if (gameObj.tags.includes("sea")) {
        hook.vel.y = -300;
        map.pressed = true;
        map.pressedTwice = true;
      }
    });

    hook.onUpdate(() => {
      hook.pos.x = player.pos.x;
    });
  };