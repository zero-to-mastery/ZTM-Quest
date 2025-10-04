export const controls = (k, map) => {
    if (!k.isTouchscreen()) {
        return k.make([
            k.text('Press space to hook\n\nLeft/right to move', { size: 10 }),
              k.pos((k.canvas.width - k.center().x) / 2 - 32, 8),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.z(10),
            'controls',
        ]);
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
