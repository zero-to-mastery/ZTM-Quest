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
    let abort = new AbortController();

    dialogUI.style.display = 'block';

    if (text.length > 1) {
        nextBtn.style.display = 'block';
        await slightPause().then(() => nextBtn.focus());
    }
    closeBtn.style.display = 'none';

    for await (const t of text) {
        abort = new AbortController();
        await new Promise((res) => {
            if (t === text[text.length - 1]) res(); // resolve on last text

            processDialogue({ dialog, text: t, characterName, abort });

            nextBtn.addEventListener('click', () => {
                abort.abort();
                res();
            });
        });
    }

    nextBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    closeBtn.focus();

    function onCloseBtnClick() {
        onDisplayEnd();
        abort.abort();
        dialogUI.style.display = 'none';
        dialog.innerHTML = '';
        closeBtn.removeEventListener('click', onCloseBtnClick);
        k.triggerEvent('dialog-closed', { player, characterName, text });
        k.canvas.focus();
    }
    closeBtn.addEventListener('click', onCloseBtnClick);

    addEventListener('keydown', (key) => {
        if (key.code === 'Enter') {
            document.activeElement.click();
        }
        if (key.code === 'Escape') closeBtn.click();
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

    const abort = new AbortController();
    processDialogue({ dialog, text: text.join(' '), abort });

    return new Promise((resolve) => {
        function onCloseBtnClick() {
            onDisplayEnd();
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            closeBtn.removeEventListener('click', onCloseBtnClick);
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            k.canvas.focus();
            resolve(false); // Resolve with false when "No" is clicked
        }

        function onNextBtnClick() {
            onDisplayEnd();
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.removeEventListener('click', onCloseBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            k.canvas.focus();
            resolve(true); // Resolve with true when "Yes" is clicked
        }

        nextBtn.addEventListener('click', onNextBtnClick);
        closeBtn.addEventListener('click', onCloseBtnClick);
        addEventListener('keydown', (key) => {
            if (key.code === 'Enter') {
                document.activeElement.click();
            }
            if (key.code === 'Escape') closeBtn.click();
        });
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
        // k.offscreen({ hide: true, pause: true })
    ]);

    const actionLabel = k.add([
        k.text('t', { size: 16, align: 'center' }),
        k.color(0, 0, 0),
        k.pos(actionModal.pos.x + 5, actionModal.pos.y + 4),
        `action-label-${sprite.tags[0]}`,
        //k.offscreen({ hide: true, pause: true })
    ]);

    return { actionModal, actionLabel };
}
