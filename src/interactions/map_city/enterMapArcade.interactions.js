import { displayDialogue } from '../../utils';

//player interaction logic with arcade
export const sampleArcadeInteraction = () => {
    // sample of coins balance
    var coinBal = 1000;

    return 'You have ${coinBal} coins to spend'; 

};

//shows what happens when player is in arcade
export const storeMainAreaInteraction = (player, k, map) => {
    //if user runs into the store (arcade in this example), show them the balance
    player.onCollide('enter_map_arcade', () => {
        player.isInDialog = true;
        displayDialogue(sampleArcadeInteraction(), () => {
            player.isInDialog = false;
        });


    });
};