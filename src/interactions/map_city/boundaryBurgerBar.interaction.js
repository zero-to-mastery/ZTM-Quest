import { displayPermissionBox } from '../../utils';

export const boundaryBurgerBarInteraction = (player, k) => {
    player.onCollide('boundary_burger_bar', async () => {
        
        let wantBurger = await displayPermissionBox(
            'Hello! Would you like a burger?'
        );
        
      
        if (wantBurger) {
            k.debug.log('Enjoy your burger!'); //testing purposes you may uncomment it or add displayPermission box your wish
        } else {
            k.debug.log('Maybe next time!'); 
        }
    });
};
