import { displayPermissionBox } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';
import { purchaseItem } from '../../utils/coinsUpdate';

export const boundaryBurgerBarInteraction = (player, k) => {
    player.onCollide('boundary_burger_bar', async () => {
        let wantBurger = await displayPermissionBox({
            k,
            player,
            text: ['Hello! Would you like a burger?'],
        });

        if (wantBurger) {
            k.debug.log('Enjoy your burger!'); //testing purposes you may uncomment it or add displayPermission box your wish
            const purchaseStatus = purchaseItem(k, 25, 40);
            if (purchaseStatus === "purchased") {
                updateAchievements("Food enthusiast", "Burger Store");
            }
        } else {
            k.debug.log('Maybe next time!');
        }
    });
};
