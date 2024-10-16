export const scoreUI = (k, map) => {
    if (!k.isTouchscreen()) {
        return k.make([
            k.text(`Score: ${map.score}`, { size: 10 }),
            k.pos(16, 24),
            k.z(10),
            'score',
        ]);
    }
    console.log(map.screenPos());
    return k.make([
        k.text(`Score: ${map.score}`, {
            size: 10,
            transform: { color: k.BLACK },
        }),
        k.pos(190, 320 - 64),
        k.anchor('center'),
        'score',
    ]);
};
