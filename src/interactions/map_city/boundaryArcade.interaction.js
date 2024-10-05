import { displayPermissionBox } from '../../utils';

export const boundaryArcadeInteraction = (player, k) => {
    player.onCollide('boundary_arcade', async () => {
        let wantToPlay = await displayPermissionBox(
            'Hello! Would you like to play some arcade games?'
        );

        if (wantToPlay) {
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        } else {
            k.debug.log('Maybe next time!');
        }
    });
};
