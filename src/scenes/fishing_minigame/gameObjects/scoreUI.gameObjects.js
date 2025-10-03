export const scoreUI = (k, map) => {
    if (!k.isTouchscreen()) {
        const scoreText = k.make([
            k.text(`Score: ${map.score}`, { size: 8 }),
            k.pos(15, 25),
            k.z(10),
            'score',
            {
                update() {
                    if (map.height) {
                        this.pos.y = map.height / 2 - 135;
                    }
                }
            }
        ]);
        return scoreText;
    }

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
