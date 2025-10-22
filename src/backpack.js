import { getGameState, setGameState } from './utils/gameState';
import { k } from './kplayCtx';

const backpackBtn = document.getElementById('backpack-btn');

let isOpened = false;

export class Backpack {
    constructor(state, maxSlots = 20) {
        this.maxSlots = maxSlots;
        this.inventory = state;
    }

    getInventorySlotHtml(item) {
        return `<div class="inventory-slot">
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
        const newState = getGameState();
        newState.player.backpack.items = this.inventory;
        setGameState(newState);
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
            return new Backpack(
                gameState.player.backpack.items,
                gameState.player.backpack.maxSlots
            );
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
    }

    handleCloseBackpack() {
        if (!k.isFocused()) {
            k.pressButton('backpack');
            k.canvas.focus();
        }
    }

    openBackpack() {
        this.render();
        document.addEventListener('keypress', this.handleCloseBackpack);
        const inventoryCloseBtn = document.getElementById(
            'inventory-close-btn'
        );
        inventoryCloseBtn.addEventListener('click', this.handleCloseBackpack);
        isOpened = true;
    }

    hideBackpack() {
        this.hide();
        document.removeEventListener('keypress', this.handleCloseBackpack);
        const inventoryCloseBtn = document.getElementById(
            'inventory-close-btn'
        );
        inventoryCloseBtn.removeEventListener(
            'click',
            this.handleCloseBackpack
        );
        isOpened = false;
    }

    static init() {
        const instance = Backpack.getInstance();
        if (instance) {
            backpackBtn.style.display = 'block';

            backpackBtn.addEventListener('click', () => {
                instance.openBackpack();
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
