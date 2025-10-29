import { Backpack } from './backpack';
import { time } from './kplayCtx';

const processDialogue = async ({
    dialog,
    text,
    characterName,
    abort = null,
}) => {
    let currentText = '';
    const timeoutIds = [];

    if (abort) {
        abort.signal.addEventListener('abort', () => {
            currentText = text;
            dialog.innerHTML = characterName
                ? `<strong>${characterName}:</strong><br>${currentText}`
                : currentText;

            timeoutIds.forEach((id) => clearTimeout(id));
        });
    }

    for (const t of text) {
        currentText += t;
        dialog.innerHTML = characterName
            ? `<strong>${characterName}:</strong><br>${currentText}`
            : currentText;
        await new Promise((res) => {
            dialog.scrollTop = dialog.scrollHeight;
            timeoutIds.push(setTimeout(res, 20));
        });
    }
};

const slightPause = () => new Promise((res) => setTimeout(res, 500));

export async function displayDialogue({
    k,
    player,
    characterName,
    text,
    onDisplayEnd = () => {},
    addFlickerEffect = false,
}) {
    document.getElementById('custom-prompt').style.display = 'none';
    time.paused = true;
    player.state.isInDialog = true;
    const dialogUI = document.getElementById('textbox-container');
    const dialog = document.getElementById('dialog');
    const closeBtn = document.getElementById('dialog-close-btn');
    const nextBtn = document.getElementById('dialog-next-btn');
    const statsUI = document.getElementById('stats-container');
    const miniMapUI = document.getElementById('minimap');
    let abort = new AbortController();

    statsUI.style.display = 'none';
    dialogUI.style.display = 'block';
    miniMapUI.style.display = 'none';

    // Add magical flicker effect if requested
    if (addFlickerEffect) {
        dialogUI.classList.add('magical-flicker');
    }

    if (text.length > 1) {
        nextBtn.style.display = 'block';
        await slightPause().then(() => nextBtn.focus());
    }
    closeBtn.style.display = 'none';

    for await (const t of text) {
        abort = new AbortController();
        await new Promise((res) => {
            const dialoguePromise = processDialogue({
                dialog,
                text: t,
                characterName,
                abort,
            });

            // Wait for dialogue to complete or user to click next
            dialoguePromise.then(() => {
                if (t === text[text.length - 1]) res(); // resolve on last text
            });

            nextBtn.addEventListener('click', () => {
                abort.abort();
                res();
            });
        });
    }

    nextBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    closeBtn.focus();

    // Return a Promise that resolves when the dialogue is closed
    return new Promise((resolve) => {
        async function onCloseBtnClick() {
            await onDisplayEnd();
            time.paused = false;
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            statsUI.style.display = 'flex';
            closeBtn.removeEventListener('click', onCloseBtnClick);
            window.removeEventListener('keydown', onKeyDown);

            // Remove magical flicker effect if it was added
            if (addFlickerEffect) {
                dialogUI.classList.remove('magical-flicker');
            }

            k.triggerEvent('dialog-closed', { player, characterName, text });
            player.state.isInDialog = false;
            k.canvas.focus();
            resolve(); // Resolve the Promise when dialogue is closed
        }

        function onKeyDown(key) {
            if (key.code === 'Enter') {
                document.activeElement.click();
            }
            if (key.code === 'Escape') {
                closeBtn.click();
            }
        }

        closeBtn.addEventListener('click', onCloseBtnClick);
        window.addEventListener('keydown', onKeyDown);
        k.triggerEvent('dialog-displayed', { player, characterName, text });
    });
}

export async function displayPermissionBox({
    k,
    player,
    text,
    onDisplayEnd = () => {},
    purchaseCost,
}) {
    time.paused = true;
    player.state.isInDialog = true;
    const dialogUI = document.getElementById('textbox-container');
    const dialog = document.getElementById('dialog');
    const closeBtn = document.getElementById('dialog-close-btn');
    const nextBtn = document.getElementById('dialog-next-btn');
    const statsUI = document.getElementById('stats-container');
    const miniMapUI = document.getElementById('minimap');
    closeBtn.innerHTML = 'No';
    nextBtn.innerHTML =
        purchaseCost !== undefined
            ? `Yes (${purchaseCost} coin${purchaseCost !== 1 ? 's' : ''})`
            : 'Yes';
    statsUI.style.display = 'none';
    miniMapUI.style.display = 'none';
    dialogUI.style.display = 'block';
    closeBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    nextBtn.focus();

    const abort = new AbortController();
    processDialogue({ dialog, text: text.join(' '), abort });

    return new Promise((resolve) => {
        async function onCloseBtnClick() {
            await onDisplayEnd();
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            statsUI.style.display = 'flex';
            closeBtn.removeEventListener('click', onCloseBtnClick);
            nextBtn.removeEventListener('click', onNextBtnClick);
            window.removeEventListener('keydown', onKeyDown);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            player.state.isInDialog = false;
            time.paused = false;

            k.canvas.focus();
            resolve(false); // Resolve with false when "No" is clicked
        }

        async function onNextBtnClick() {
            await onDisplayEnd();
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            statsUI.style.display = 'flex';
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.removeEventListener('click', onCloseBtnClick);
            window.removeEventListener('keydown', onKeyDown);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            player.state.isInDialog = false;
            time.paused = false;

            k.canvas.focus();
            resolve(true); // Resolve with true when "Yes" is clicked
        }

        function onKeyDown(key) {
            if (key.code === 'Enter') {
                document.activeElement.click();
            }
            if (key.code === 'Escape') {
                closeBtn.click();
            }
        }

        nextBtn.addEventListener('click', onNextBtnClick);
        closeBtn.addEventListener('click', onCloseBtnClick);
        window.addEventListener('keydown', onKeyDown);
        k.triggerEvent('dialog-displayed', { player, text });
    });
}

export function getCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        return 1;
    } else {
        return 1.5;
    }
}

export function setCamScale(k) {
    const scale = getCamScale(k);
    k.camScale(k.vec2(scale));
}

// NOTE: sprite must be an npc not an object like mailbox
export const buildInteractionPrompt = (sprite, k) => {
    k.loadSprite('question-bubble', './assets/sprites/question-bubble.png', {
        sliceX: 8,
        sliceY: 1,
        anims: {
            float: {
                from: 0,
                to: 7,
            },
        },
    });

    sprite.add([
        k.sprite('question-bubble', { anim: 'float' }),
        k.animate([0, 1, 2, 3, 4, 5, 6, 7]),
        k.area(),
        k.color(255, 255, 255),
        k.outline(2, k.Color.BLACK),
        k.anchor('botleft'),
        k.pos(k.vec2(0, -10)),
        k.layer('ui'),
        `question-bubble`,
    ]);
};

export const tearDownInteractionPrompt = (k) => {
    const questionBubbles = k.get('question-bubble', { recursive: true });

    if (questionBubbles.length > 0) {
        questionBubbles.forEach((bubble) => {
            bubble.destroy();
        });
    }
};

const gameWindow = document.querySelector('.game-window');

export const hideCanvasFrame = () => {
    gameWindow.classList.add('full-screen');
};

export const showCanvasFrame = () => {
    gameWindow.classList.remove('full-screen');
};

export async function getAssets() {
    const fileSHA = await fetch(
        'https://api.github.com/repos/zero-to-mastery/ZTM-Quest/contents/asset_credits.md'
    );
    const data = await fileSHA.json();
    const fileContents = atob(data.content);
    return fileContents
        .split('\n')
        .filter((content) => content.trim() !== '')
        .join('\n');
}

export async function getContributors() {
    const contributors = await fetch(
        'https://api.github.com/repos/zero-to-mastery/ZTM-Quest/contributors'
    );
    const data = await contributors.json();
    return data
        .map((person) => {
            return person.login;
        })
        .join('\n');
}

export const objectToBackpackInteraction =
    ({ tag, title }) =>
    (player, k, map) => {
        let text;
        let pressE;

        player.onCollide(tag, (obj) => {
            if (!player.state.backpack) return;
            text = obj.add([
                k.pos(obj.width / 2 - 2, -5),
                k.text('E', { size: 12 }),
            ]);

            pressE = k.onKeyPress((key) => {
                if (key === 'e') {
                    // move it to backpack
                    Backpack.addItem({
                        title: title || tag,
                        assetUrl: obj.assetUrl,
                    });
                    obj.destroy();
                }
            });
        });

        player.onCollideEnd(tag, (obj) => {
            if (!pressE) return;
            pressE.cancel();
            obj.remove(text);
        });
    };

export const showCustomPrompt = (
    message,
    options,
    callback,
    player,
    k,
    abort
) => {
    /**
     * Show custom prompt with clickable options
     */

    const statsUI = document.getElementById('stats-container');
    const miniMapUI = document.getElementById('minimap');
    statsUI.style.display = 'none';
    miniMapUI.style.display = 'none';

    // Set the prompt message
    let promptMessage = document.getElementById('prompt-message');
    promptMessage.innerHTML = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        if (typeof option === 'object') {
            button.innerHTML = option.text;
        } else {
            button.innerHTML = option;
        }
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            if (typeof option === 'object') {
                callback(option.value);
            } else {
                callback(option);
            }
            closeCustomPrompt(player, k, abort);
        };

        // Add keyboard event listener for accessibility
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent the default behavior
                if (typeof option === 'object') {
                    callback(option.value);
                } else {
                    callback(option);
                }
                closeCustomPrompt(player, k, abort);
            }
        });

        optionsContainer.appendChild(button);
    });

    // Add arrow key navigation
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    let currentIndex = 0;

    const keyHandler = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % buttons.length;
            buttons[currentIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[currentIndex].focus();
        }
    };

    document.addEventListener('keydown', keyHandler);

    // Clean up event listener when prompt closes
    window.cleanupPromptKeyHandler = () => {
        document.removeEventListener('keydown', keyHandler);
    };

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
};

// Function to close the custom prompt
export const closeCustomPrompt = (player, k, abort) => {
    // Clean up keyboard event listener
    if (window.cleanupPromptKeyHandler) {
        window.cleanupPromptKeyHandler();
        delete window.cleanupPromptKeyHandler;
    }

    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';

    const statsUI = document.getElementById('stats-container');
    statsUI.style.display = 'flex';

    player.vel = k.vec2(0, 0);

    player.state.isInDialog = false;
    time.paused = false;

    k.canvas.focus();

    [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'w',
        'a',
        's',
        'd',
    ].forEach((key) => {
        const event = new KeyboardEvent('keyup', { key: key });
        k.canvas.dispatchEvent(event);
    });
    abort.abort();
};
