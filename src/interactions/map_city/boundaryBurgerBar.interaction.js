import { displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

export const boundaryBurgerBarInteraction = (player, k) => {
    player.onCollide('boundary_burger_bar', async () => {
        player.isInDialog = true;
        let wantBurger = await displayPermissionBox({
            k,
            player,
            text: ['Hello! Would you like a burger?'],
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });

        if (wantBurger) {
            k.debug.log('Enjoy your burger!'); //testing purposes you may uncomment it or add displayPermission box your wish
            updateEnergyState(player.state, 40);
        } else {
            k.debug.log('Maybe next time!');
        }
    });
};
