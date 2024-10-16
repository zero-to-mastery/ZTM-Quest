export const quitGameText = (k, map) => {
    if (!k.getSprite('ztm_logo')) {
        k.loadSprite('ztm_logo', './assets/sprites/ztm_logo_64x64.png');
    }

    if (!k.isTouchscreen()) {
        return k.make([
            k.text('Press esc to stop fishing', { size: 10 }),
            k.pos(16, 8),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.anchor('center'),
            'quitText',
        ]);
    }
    return k.make([
        k.sprite('ztm_logo'),
        k.pos(190, 64),
        k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
        k.scale(0.25),
        k.anchor('center'),
        'quitText',
    ]);
};
