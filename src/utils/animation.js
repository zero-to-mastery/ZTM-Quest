export const animations = {
    up: 'walk-up',
    down: 'walk-down',
    left: 'walk-side',
    right: 'walk-side',
};

export const stopCharacterAnims = (objectInstance) => {
    switch (objectInstance.direction) {
        case 'up':
            objectInstance.play('idle-up');
            break;
        case 'down':
            objectInstance.play('idle-down');
            break;
        case 'left':
            objectInstance.play('idle-side');
            objectInstance.flipX = true;
            break;
        case 'right':
            objectInstance.play('idle-side');
            objectInstance.flipX = false;
            break;
        default:
            objectInstance.play('idle-down');
    }
};
