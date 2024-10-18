export const makeHook = (k) => {
    k.loadSprite('hook', './assets/sprites/hook.png');

    return k.make([
        k.sprite('hook'),
        k.pos(),
        k.area(),
        k.body(),
        k.anchor('center'),
        'hook',
    ]);
};
