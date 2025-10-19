import { getGameState, setGameState } from './utils/gameState';
import { k } from './kplayCtx';

const backpackBtn = document.getElementById('backpack-btn');

let isOpened = false;

export class Backpack {
    static container = document.body;
    static gridCols = 5;

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
        const div = document.createElement('div');
        div.id = 'backpack-content';
        const slots = this.getInventorySlotsHtml();

        const backpack_html = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                #backpack-content {
                    font-family: 'Courier New', monospace;
                    background: rgba(0,0,0,0.2);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                    image-rendering: pixelated;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                }

                .game-frame {
                    background: #381154;
                    border: 8px solid #4f1975;
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
                    max-width: 520px;
                    width: 100%;
                }

                .title-bar {
                    background: #442a80;
                    border: 4px solid #6b46c1;
                    margin: 16px;
                    padding: 20px;
                    text-align: center;
                    border-radius: 4px;
                }

                .title-bar h1 {
                    color: #fbbf24;
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: 4px;
                }

                .backpack-container {
                    padding: 0 16px 16px 16px;
                }

                .backpack-graphic {
                    background: #2d7a4f;
                    border: 6px solid #1e5a3a;
                    border-radius: 8px;
                    padding: 20px;
                    position: relative;
                }

                .backpack-flap {
                    background: #2d7a4f;
                    border: 4px solid #1e5a3a;
                    border-radius: 4px;
                    height: 24px;
                    width: 80px;
                    margin: 0 auto 16px;
                    position: relative;
                    left: 0;
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .inventory-grid {
                    display: grid;
                    grid-template-columns: repeat(${Backpack.gridCols}, 1fr);
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .inventory-slot {
                    background: #1e5a3a;
                    border: 4px solid #0f3d28;
                    border-radius: 4px;
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }

                .inventory-slot:hover {
                    background: #2d7a4f;
                    transform: translateY(-2px);
                }

                .inventory-slot.empty {
                    background: #1a4d32;
                    opacity: 0.6;
                }

                 .quantity-badge {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: white;
                    color: #2a1a42;
                    font-size: 11px;
                    font-weight: bold;
                    padding: 2px 5px;
                    border-radius: 3px;
                    border: 2px solid #2a1a42;
                    line-height: 1;
                    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
                }

                .tooltip {
                    position: absolute;
                    bottom: 110%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #2a1a42;
                    color: #f4d03f;
                    padding: 8px 12px;
                    border-radius: 4px;
                    border: 2px solid #3d2b5c;
                    font-size: 12px;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s;
                    z-index: 10;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
                }

                .inventory-slot:hover .tooltip {
                    opacity: 1;
                }

                .stats-section {
                    background: #1e5a3a;
                    border: 4px solid #0f3d28;
                    border-radius: 4px;
                    padding: 16px;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fbbf24;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 12px;
                }

                .stat-row:last-child {
                    margin-bottom: 0;
                }

                .stat-label {
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .progress-bar {
                    flex: 1;
                    height: 16px;
                    background: #0f3d28;
                    border: 2px solid #fbbf24;
                    border-radius: 2px;
                    margin: 0 12px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: #fbbf24;
                    width: 32%;
                    transition: width 0.3s;
                }

                .footer {
                    background: #442a80;
                    border: 4px solid #6b46c1;
                    margin: 16px;
                    padding: 16px;
                    text-align: center;
                    border-radius: 4px;
                }

                .footer p {
                    color: #c4b5fd;
                    font-size: 14px;
                    letter-spacing: 2px;
                }

                @media (max-width: 600px) {
                    .inventory-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 8px;
                    }
                    
                    .title-bar h1 {
                        font-size: 20px;
                        letter-spacing: 2px;
                    }
                    
                    .inventory-slot {
                        font-size: 24px;
                    }
                }
            </style>
            <div class="game-frame">
                <div class="title-bar">
                    <h1>BACKPACK</h1>
                </div>
                 <div class="backpack-container">
                    <div class="backpack-graphic">
                        <div class="backpack-flap"></div>
                        
                        <div class="inventory-grid">
                           ${slots.join(' ')}
                        </div>
                        
                        <div class="stats-section">
                            <div class="stat-row">
                                <span class="stat-label">SLOTS:</span>
                                <span style="margin-left: auto;">${this.inventory.length} / ${this.maxSlots}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Press [I] to close inventory</p>
                </div>
            </div>
        
        `;

        div.innerHTML = backpack_html;

        Backpack.container.appendChild(div);
    }

    unmount() {
        const backpackElement = document.getElementById('backpack-content');
        Backpack.container.removeChild(backpackElement);
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
        isOpened = true;
    }

    hideBackpack() {
        this.unmount();
        document.removeEventListener('keypress', this.handleCloseBackpack);
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
