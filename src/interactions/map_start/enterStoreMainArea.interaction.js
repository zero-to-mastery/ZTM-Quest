import { displayDialogue } from '../../utils';

//player interaction logic with store
export const sampleStoreInteraction = () => {
    // sample of coins balance
    var coinBal = 1000;

    return 'You have ${coinBal} coins to spend'; 

};

//shows what happens when player is in store
export const storeMainAreaInteraction = (player, k, map) => {
    //if user runs into the store, show them the balance
    player.onCollide('store_mainArea', () => {
        player.isInDialog = true;
        displayDialogue(sampleStoreInteraction(), () => {
            player.isInDialog = false;
        });


    });
};