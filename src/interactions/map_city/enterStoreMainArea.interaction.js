import { displayDialogue } from '../../utils';
import { sampleStoreInteraction, sampleArcadeInteraction } from './enterMapArcade.interactions';

//player interaction logic with arcade
function sampleArcadeInteraction() {
    // sample of coins balance
    var coinBal = 1000;

    return 'You have ${coinBal} coins to spend';

};

//shows what happens when player is in arcade
export const storeMainAreaInteraction = (player, k, map) => {
    //if user runs into the arcade, show them the balance
    player.onCollide('enter_map_arcade', () => {
        player.isInDialog = true;
        displayDialogue(sampleStoreInteraction(), () => {
            player.isInDialog = false;
        });
    //if user runs into the house, show them the house
    player.onCollide('tiny_house_top_left_door', () => {
        player.isInDialog = true;
        /*displayDialogue(sampleTinyHouseInteraction(), () => { //sampleTinyHouseInteraction needs building
            player.isInDialog = false;
        });*/
    });


    });
};