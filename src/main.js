import { k } from './kplayCtx';

import './scenes/start';
import './scenes/forest_junction';
import './scenes/arcade';
import { setCamScale } from './utils';
import './styles/global.css';

import { toggleInventory, onPlayerCollectItems } from './inventory';  // Import from inventory.js

k.onResize(() => {
    setCamScale(k);
});

k.go('start');
// To test different maps instead of going through each and every scene to get to yours,
// Import the scene, name the scene, and then name the spawn point as an additional tag
// k.go('insert_scene_name_here', 'insert_spawn_point_here');

/*
    Spawn Points
    Start - spawn_left, spawn_right
    City - spawn_left, spawn_top, spawn_arcade, spawn_right, spawn_office_left, spawn_office_right
    Arcade - player (No need to add a tag)
    Forest Junction - spawn_bottom, spawn_top, spawn_right
    Forest - spawn_bottom, spawn_topright, spawn_topleft
    Campus House - player (No need to add a tag)
*/


const openInventoryButton = document.createElement('button');
openInventoryButton.id = 'open-inventory';
openInventoryButton.innerText = 'Inventory';
openInventoryButton.style.position = 'absolute';
openInventoryButton.style.bottom = '40px';
openInventoryButton.style.right = '30px';
const openButtonStyle = document.createElement('style');
openButtonStyle.innerHTML = `
    #open-inventory {
        background-color: black;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 15px;
        font-size: 16px;
    }
    #open-inventory:hover {
        background-color: black;
    }
`;
document.head.appendChild(openButtonStyle);
document.body.appendChild(openInventoryButton);

// Event listener for opening the inventory
openInventoryButton.addEventListener('click', toggleInventory);

// Simulate collecting items
const iconUrl = 'https://picsum.photos/id/1/200/300';
const iconUrl1 = 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';

onPlayerCollectItems('Laptop', iconUrl);
onPlayerCollectItems('Sword', iconUrl1);



