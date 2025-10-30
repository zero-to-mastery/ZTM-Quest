import { getGameState, saveGameState, setGameState } from './utils/gameState';
import { k } from './kplayCtx';
import { updateEnergyUI } from './utils/energyUpdate';
const backpackBtn = document.getElementById('backpack-btn');

let isOpened = false;
let selectedItem = null;

function consumeInteraction(energyQty) {
    const gameState = getGameState();
    gameState.player.energy += energyQty;
    setGameState(gameState);
    updateEnergyUI(gameState.player.energy);
}

const itemsMap = {
    banana: () => consumeInteraction(10),
};

export class Backpack {
    constructor(maxSlots = 20) {
        this.maxSlots = maxSlots;
    }

    get inventory() {
        const gameState = getGameState();
        return gameState.player.backpack.items;
    }

    getInventorySlotHtml(item) {
        return `<div class="inventory-slot ${selectedItem === item.itemName ? 'selected' : ''}" data-id="${item.itemName}">
            <img src="${item.assetUrl}" with="100%" alt="" />
            <span class="quantity-badge">${item.qty || 1}</span>
            <div class="tooltip">${item.itemName} ×${item.qty || 1}</div>
        </div>`;
    }

    getInventorySlotsHtml() {
        const slots = this.inventory.map((item) => {
            return this.getInventorySlotHtml(item);
        });
        const emptySlotsCount = this.maxSlots - this.inventory.length;
        for (let i = 0; i < emptySlotsCount; i++) {
            slots.push('<div class="inventory-slot empty"></div>');
        }
        return slots;
    }

    addItemToBackpack({ title, assetUrl }) {
        const itemInd = this.inventory.findIndex(
            (item) => item.itemName === title
        );
        if (itemInd !== -1) {
            const existedItem = this.inventory[itemInd];
            this.inventory[itemInd] = {
                ...existedItem,
                qty: (existedItem.qty || 1) + 1,
            };
        } else {
            // Check if we have empty slots
            if (this.inventory.length < this.maxSlots - 1) {
                this.inventory.push({
                    itemName: title,
                    assetUrl: assetUrl,
                    qty: 1,
                });
            } else {
                k.debug.log(
                    'No empty slots left. Please remove items from backpack.'
                );
            }
        }
        this.saveInventoryState(this.inventory);
    }

    saveInventoryState() {
        const newState = getGameState();
        newState.player.backpack.items = this.inventory;
        setGameState(newState);
    }

    selectItem(slotEl) {
        const itemId = slotEl.getAttribute('data-id');
        selectedItem = itemId;
        // deselect others
        const slots = document.querySelectorAll(
            '#backpack-content .inventory-slot:not(.empty)'
        );
        slots.forEach((item) => {
            item.classList.remove('selected');
        });
        //higlight selected item
        slotEl.classList.add('selected');
    }

    decreaseItemQty(itemId) {
        const ind = this.inventory.findIndex(
            (item) => item.itemName === itemId
        );

        if (ind != -1) {
            if (this.inventory[ind].qty >= 2) {
                --this.inventory[ind].qty;
            } else {
                //remove item
                this.inventory.splice(ind, 1);
                selectedItem = null;
            }
            this.saveInventoryState();
            this.render();
        }
    }

    useItem() {
        if (!selectedItem) return;
        const action = itemsMap[selectedItem];
        action?.();
        // Decrease the qty
        this.decreaseItemQty(selectedItem);
    }

    dropItem() {
        if (!selectedItem) return;
        const ind = this.inventory.findIndex(
            (item) => item.itemName === selectedItem
        );

        if (ind != -1) {
            this.inventory.splice(ind, 1);
            selectedItem = null;
            this.saveInventoryState();
            this.render();
        }
    }

    render() {
        const backpack = document.getElementById('backpack-content');
        backpack.style.display = 'flex';

        const slots = this.getInventorySlotsHtml();
        const inventory = document.getElementById('inventory-grid');
        inventory.innerHTML = slots.join(' ');

        const statSlots = document.getElementById('stat-slots');
        statSlots.innerHTML = `${this.inventory.length} / ${this.maxSlots}`;
    }

    hide() {
        const backpackElement = document.getElementById('backpack-content');
        backpackElement.style.display = 'none';
    }

    static getInstance() {
        const gameState = getGameState();
        if (gameState.player.backpack) {
            return new Backpack(gameState.player.backpack.maxSlots);
        }
        return false;
    }

    static addItem(params) {
        const instance = Backpack.getInstance();
        if (!instance) return;
        instance.addItemToBackpack(params);
    }

    static initState() {
        const gameState = getGameState();
        gameState.player.backpack = {
            items: [],
            maxSlots: 20,
        };
        saveGameState(gameState);
    }

    handleDocumentKeypress(e) {
        if (e.key == 'i') {
            //workaround for press backpack key if canvas lose the focus
            if (!k.isFocused()) {
                k.canvas.focus();
                k.pressButton('backpack');
            }
        } else if (e.key == 'r') {
            this.useItem();
        } else if (e.key == 'x') {
            this.dropItem();
        }
    }

    openBackpack() {
        this.render();
        document.addEventListener(
            'keypress',
            this.handleDocumentKeypress.bind(this)
        );
        isOpened = true;
    }

    hideBackpack() {
        this.hide();
        document.removeEventListener(
            'keypress',
            this.handleDocumentKeypress.bind(this)
        );
        isOpened = false;
    }

    static init() {
        const instance = Backpack.getInstance();
        if (instance) {
            Backpack.showButton();

            backpackBtn.addEventListener('click', () => {
                instance.openBackpack();
            });

            const inventoryCloseBtn = document.getElementById(
                'inventory-close-btn'
            );
            const useItem = document.getElementById('item-use-btn');
            const dropItem = document.getElementById('item-drop-btn');
            inventoryCloseBtn.addEventListener(
                'click',
                instance.hideBackpack.bind(instance)
            );
            useItem.addEventListener('click', instance.useItem.bind(instance));
            dropItem.addEventListener(
                'click',
                instance.dropItem.bind(instance)
            );

            document
                .getElementById('backpack-content')
                .addEventListener('click', (e) => {
                    const slot = e.target.closest(
                        '.inventory-slot:not(.empty)'
                    );
                    if (!slot) return;
                    instance.selectItem(slot);
                });
        }
    }

    static backpackInteractions() {
        k.onButtonPress('backpack', () => {
            const instance = Backpack.getInstance();
            if (!instance) return;

            if (!isOpened) {
                instance.openBackpack();
            } else {
                instance.hideBackpack();
            }
        });
    }

    static showButton() {
        backpackBtn.style.display = 'block';
    }

    static removeButton() {
        backpackBtn.style.display = 'none';
    }
}
