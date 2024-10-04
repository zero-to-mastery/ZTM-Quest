const processDialogue = async ({ dialog, text, characterName }) => {
    let currentText = '';
    for (const t of text) {
        currentText += t;
        dialog.innerHTML = characterName
            ? `<strong>${characterName}:</strong><br>${currentText}`
            : currentText;
        await new Promise((res) => setTimeout(res, 20));
    }
};

// Seems to be a bug where when the canvas loses focus,
// the keypress event listener is not triggered
const slightPause = () => new Promise((res) => setTimeout(res, 500));

export async function displayDialogue({
    k,
    player,
    characterName,
    text,
    onDisplayEnd = () => {},
}) {
    const dialogUI = document.getElementById('textbox-container');
    const dialog = document.getElementById('dialog');
    const closeBtn = document.getElementById('dialog-close-btn');
    const nextBtn = document.getElementById('dialog-next-btn');
    dialogUI.style.display = 'block';

    if (text.length > 1) {
        nextBtn.style.display = 'block';
        await slightPause().then(() => nextBtn.focus());
    }
    closeBtn.style.display = 'none';
    for await (const t of text) {
        await new Promise((res) => {
            nextBtn.addEventListener('click', () => res());
            if (t === text[text.length - 1]) res(); // resolve on last text
            processDialogue({ dialog, text: t, characterName });
        });
    }
    nextBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    closeBtn.focus();

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogUI.style.display = 'none';
        dialog.innerHTML = '';
        closeBtn.removeEventListener('click', onCloseBtnClick);
        k.triggerEvent('dialog-closed', { player, characterName, text });
        k.canvas.focus();
    }
    closeBtn.addEventListener('click', onCloseBtnClick);

    addEventListener('keydown', (key) => {
        if (['Enter', 'Escape'].includes(key.code)) closeBtn.click();
    });
    k.triggerEvent('dialog-displayed', { player, characterName, text });
}

export async function displayPermissionBox({
    k,
    player,
    text,
    onDisplayEnd = () => {},
}) {
    const dialogUI = document.getElementById('textbox-container');
    const dialog = document.getElementById('dialog');
    const closeBtn = document.getElementById('dialog-close-btn');
    const nextBtn = document.getElementById('dialog-next-btn');
    closeBtn.innerHTML = 'No';
    nextBtn.innerHTML = 'Yes';
    dialogUI.style.display = 'block';
    closeBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    nextBtn.focus();

    processDialogue({ dialog, text: text.join(' ') });

    return new Promise((resolve) => {
        function onCloseBtnClick() {
            onDisplayEnd();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            closeBtn.removeEventListener('click', onCloseBtnClick);
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            resolve(false); // Resolve with false when "No" is clicked
        }

        function onNextBtnClick() {
            onDisplayEnd();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.removeEventListener('click', onCloseBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            resolve(true); // Resolve with true when "Yes" is clicked
        }

        nextBtn.addEventListener('click', onNextBtnClick);
        closeBtn.addEventListener('click', onCloseBtnClick);
        k.triggerEvent('dialog-displayed', { player, text });
    });
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
    } else {
        k.camScale(k.vec2(1.5));
    }
}

// NOTE: sprite must be an npc not an object like mailbox
export function buildActionModal(sprite, k) {
    const spritePos = sprite.pos;

    const actionModal = k.add([
        k.rect(20, 20),
        k.area(),
        k.color(255, 255, 255),
        k.outline(2, k.Color.BLACK),
        k.pos(spritePos.x - 10, spritePos.y - sprite.height - 30),
        k.layer('ui'),
        `action-modal-${sprite.tags[0]}`,
    ]);

    const actionLabel = k.add([
        k.text('t', { size: 16, align: 'center' }),
        k.color(0, 0, 0),
        k.pos(actionModal.pos.x + 5, actionModal.pos.y + 4),
        `action-label-${sprite.tags[0]}`,
    ]);

    return { actionModal, actionLabel };
}
