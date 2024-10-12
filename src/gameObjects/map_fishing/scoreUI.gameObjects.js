export const scoreUI = (k, map) => {
    console.log(map.width);
    return k.make([
        k.text(`Score: ${map.score}`, { size: 10 }),
        k.pos(16, 24),
        k.z(10),
        'score',
    ]);
};
