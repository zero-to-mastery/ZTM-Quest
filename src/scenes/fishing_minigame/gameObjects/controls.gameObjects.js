export const controls = (k, map) => {
    if (!k.isTouchscreen()) {
        const controlsText = k.make([
            k.text('Press space to hook\n\nLeft/right to move', { size: 6 }),
            k.pos(200, 35),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.z(10),
            'controls',
            {
                update() {
                    if (map.width) {
                        this.pos.x = map.width / 2 - 30;
                    }
                }
            }
        ]);
        return controlsText;
    }
    return k.make([
        k.sprite('hook'),
        k.pos(310, 320 - 64),
        k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
        k.anchor('center'),
        k.z(10),
        'controls',
    ]);
};
