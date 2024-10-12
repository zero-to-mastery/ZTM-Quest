export const quitGameText = (k, map) => {
    return k.make([
        k.text('Press esc to stop fishing', { size: 10 }),
        k.pos(16, 8),
        k.z(10),
        'quitText',
    ]);
};
