export const quitGameText = (k, map) => {
    if (!k.getSprite('ztm_logo')) {
        k.loadSprite('ztm_logo', './assets/sprites/ztm_logo_64x64.png');
    }

    if (!k.isTouchscreen()) {
        const quitText = k.make([
            k.text('Press esc to stop fishing', { size: 6 }),
            k.pos(200, 20),
            k.area({ shape: new k.Rect(k.vec2(0), 64, 8) }),
            k.z(10),
            'quitText',
            {
                update() {
                    if (map.width) {
                        this.pos.x = map.width / 2 - 30;
                    }
                }
            }
        ]);
        return quitText;
    }
    return k.make([
        k.sprite('ztm_logo'),
        k.pos(190, 64),
        k.area({ shape: new k.Rect(k.vec2(0), 16, 16) }),
        k.scale(0.25),
        k.anchor('center'),
        k.z(10),
        'quitText',
    ]);
};
