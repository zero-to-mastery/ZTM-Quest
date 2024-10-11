export const makeHook = (k, spawnpointsCharacters, map) => {
    const hook = k.make([
      k.sprite("hook"),
      k.pos(spawnpointsCharacters["hook"]),
      k.area(),
      k.body(),
      k.anchor("center"),
      "hook",
    ]);

    map.add(hook);

    return hook;
  }