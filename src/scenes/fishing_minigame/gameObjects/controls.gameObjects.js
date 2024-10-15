export const controls = (k, map) => {
    if (!k.isTouchscreen()) {
        console.log(map.width);
        console.log(k.canvas.width);
        return k.make([
            k.text('Press space to hook\n\nLeft/right to move', { size: 10 }),
            k.pos((k.canvas.width - k.center().x) / 2 - 32, 8),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.z(10),
            'quitText',
        ]);
    }
    return k.make([
        k.text('Tap anywhere to hook', { size: 10 }),
        k.pos(k.center().x + 25, 24),
        k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
        k.anchor('center'),
        k.z(10),
        'quitText',
    ]);
};
