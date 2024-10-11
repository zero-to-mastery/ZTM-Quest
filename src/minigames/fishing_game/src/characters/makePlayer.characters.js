export const makePlayer = (k, spawnpointsCharacters, map) => {
    console.log(spawnpointsCharacters['player']);
    const player = k.make([
        k.sprite('player_fishing', { anim: 'idle-down' }),
        k.pos(spawnpointsCharacters['player']),
        k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
        k.body(),
        k.anchor('center'),
        'player',
    ]);

    map.add(player);

    return player;
};
