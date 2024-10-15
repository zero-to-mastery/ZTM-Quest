export const quitGameText = (k, map) => {
    if (!k.isTouchscreen()) {
        return k.make([
            k.text('Press esc to stop fishing', { size: 10 }),
            k.pos(16, 8),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.z(10),
            'quitText',
        ]);
    }
    return k.make([
        k.text('Tap here to stop fishing', { size: 10 }),
        k.pos(k.center().x + 25, 8),
        k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
        k.anchor('center'),
        k.z(10),
        'quitText',
    ]);
};
