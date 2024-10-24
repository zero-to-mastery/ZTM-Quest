// To Execute this file , follow the below steps in main.js

//1. To import from inventory.js
//import { toggleInventory, onPlayerCollectItems } from './inventory';  // Import from inventory.js

//2. Then copy paste the following code : in main.js
/*
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



=======
updateEnergyUI(getGameState().player.energy);
setInterval(() => {
    const gameState = getGameState(); // This should be inside setInterval so that gameState variable is updated at every interval.
    if (gameState.player.energy) {
        gameState.player.energy -= 1;
        setGameState(gameState);
        updateEnergyUI(gameState.player.energy);
    } else {
        k.debug.log('I need some energy.');
    }
}, 10000);

*/

// Inventory Setup
export const inventoryDiv = document.createElement('div');
inventoryDiv.id = 'inventory';
inventoryDiv.innerHTML = `
    <div id='inventory-head'>
        <h3 id="inv-h3">Inventory</h3>
    </div>
    <div id='items-grid'>
    </div>
`;
document.body.appendChild(inventoryDiv);

// Hide inventory initially
inventoryDiv.style.display = 'none';

// Style for inventory
inventoryDiv.style.width = '60%';
inventoryDiv.style.height = '60%';

const inventoryStyle = document.createElement('style');
inventoryStyle.innerHTML = `
    canvas {
        z-index: -100;
        position: absolute;
    }

    #inventory {
        z-index : -50;
        border: 6px solid black;
        background-color : #FFF8EA;
        position : absolute;
        top: 15%;
        right : 20%;
        border-radius: 25px;
        overflow: hidden;
    }
    
    #inventory-head {
        border-style: none none solid none;
    }

    #inv-h3 {
        width: 100%;
        margin: 10px;
        text-align: center;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    #items-grid {
        display: grid;
        padding-top: 10px;
        padding-bottom: 10px;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        justify-content: center;
        width: 100%;
        max-height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .inventory-close {
        padding: 5px;
        height: 40px;
        width: 40px;
        border-radius: 35px;
        border-style: none;
        background-color: #FFF8EA;
        position: absolute;
        left: 90%;
        top: 2%;
    }

    .inventory-slot {
        height: 150px;
        width: 100px;
        display: grid;
        justify-content: center;
        padding: 9px;
        gap: 10px;
    }

    .inventory-slot img {
        width: 75px;
        height: 75px;
        border-radius: 15px;
    }
`;
document.head.appendChild(inventoryStyle);

// Function to toggle inventory visibility
export function toggleInventory() {
    if (inventoryDiv.style.display === 'none') {
        inventoryDiv.style.display = 'block';
        inventoryDiv.style.zIndex = '1000';
        document.querySelector('canvas').style.zIndex = '-1';
    } else {
        inventoryDiv.style.display = 'none';
        inventoryDiv.style.zIndex = '-50';
        document.querySelector('canvas').style.zIndex = '0';
    }
}

// Inventory management object to track item counts
const inventory = {};

// Function to update the inventory display
export function updateInventoryDisplay(itemName, iconUrl) {
    const itemsGrid = document.querySelector('#items-grid');

    if (inventory[itemName]) {
        inventory[itemName].count += 1;
        const itemSlot = document.querySelector(`#slot-${itemName}`);
        const countSpan = itemSlot.querySelector('.item-count');
        countSpan.innerText = `x${inventory[itemName].count}`;
    } else {
        inventory[itemName] = { count: 1, iconUrl };

        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        slot.id = `slot-${itemName}`;

        const icon = document.createElement('img');
        icon.src = iconUrl;
        icon.alt = itemName;
        icon.classList.add('inventory-item-icon');

        const countSpan = document.createElement('span');
        countSpan.classList.add('item-count');
        countSpan.innerText = `x${inventory[itemName].count}`;

        slot.appendChild(icon);
        slot.appendChild(countSpan);

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeItemFromInventory(itemName);
        slot.appendChild(removeButton);

        itemsGrid.appendChild(slot);
    }
}

// Function to remove item from inventory
export function removeItemFromInventory(itemName) {
    if (inventory[itemName]) {
        inventory[itemName].count -= 1;
        const itemSlot = document.querySelector(`#slot-${itemName}`);
        const countSpan = itemSlot.querySelector('.item-count');

        if (inventory[itemName].count === 0) {
            delete inventory[itemName];
            itemSlot.remove();
        } else {
            countSpan.innerText = `x${inventory[itemName].count}`;
        }
    }
}

// Function to simulate item collection
export function onPlayerCollectItems(itemName, iconUrl) {
    const event = new CustomEvent('itemCollected', {
        detail: {
            itemName,
            iconUrl,
        },
    });
    document.dispatchEvent(event);
}

document.addEventListener('itemCollected', (event) => {
    const { itemName, iconUrl } = event.detail;
    updateInventoryDisplay(itemName, iconUrl);
});
