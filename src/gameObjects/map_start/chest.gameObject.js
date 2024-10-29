export const chest = (k, map, spawnpoints) => {
    k.loadSprite('chest', './assets/sprites/chest.png');
  
    return k.add([
      k.sprite('chest'),
      k.pos(map.pos.x + spawnpoints.chest.x, map.pos.y + spawnpoints.chest.y),
      k.area(),
      k.body({ isStatic: true }),
      'chest',
    ]);
  };
  