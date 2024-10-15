export const scoreUI = (k, map) => {
    console.log(map.width);
    if (!k.isTouchscreen()) {
        return k.make([
            k.text(`Score: ${map.score}`, { size: 10 }),
            k.pos(16, 24),
            k.z(10),
            'score',
        ]);
    }
    return k.make([
        k.text(`Score: ${map.score}`, { size: 10 }),
        k.pos(k.center().x, k.center().y - 8),
        k.z(10),
        'score',
    ]);
};
