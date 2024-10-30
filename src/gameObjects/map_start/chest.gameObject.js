// src/gameObjects/map_start/chest.gameObject.js
export const chest = (k, map) => {
    // Load the closed and open chest images as animations
    k.loadSprite('chest', './assets/sprites/chest_closed.png');
    k.loadSprite('chest_open', './assets/sprites/chest_open.png');
  
    // Find the reference object on the map to position the chest near it (e.g., "tree_room_1")
    const [treeRoom1] = map.query({ include: 'tree_room_1' });
  
    // Create the chest object positioned near treeRoom1
    const chestObj = k.add([
      k.sprite('chest'),                       // Start with closed chest
      k.area(),
      k.pos(treeRoom1 ? treeRoom1.pos.x + 40 : 100, treeRoom1 ? treeRoom1.pos.y + 40 : 100), // Default position if treeRoom1 not found
      k.scale(0.7),
      k.body({ isStatic: true }),
      'chest',
    ]);
  
    // Toggle between closed and open chest on click
    chestObj.onClick(() => {
      if (chestObj.sprite === 'chest') {
        chestObj.use(k.sprite('chest_open')); // Switch to open chest
      } else {
        chestObj.use(k.sprite('chest')); // Switch back to closed chest
      }
    });
  
    return chestObj;
};
