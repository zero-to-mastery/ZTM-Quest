const processDialog = (dialogue, text) => {
    let index = 0;
    let currentText = '';
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText; // Display the current tex
            index++;
            return;
        }

        clearInterval(intervalRef);
    }, 1);

    return intervalRef;
};

const processDialogWithCharacterName = (dialogue, characterName, text) => {
    let index = 0;
    let currentText = '';
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = `<strong>${characterName}:</strong><br>${currentText}`;
            index++;
            return;
        }

        clearInterval(intervalRef);
    }, 1);

    return intervalRef;
};

export async function displayDialogueWithCharacter({
    k,
    player,
    characterName,
    text,
    onDisplayEnd = () => {},
}) {
    const dialogueUI = document.getElementById('textbox-container');
    const dialogue = document.getElementById('dialogue');
    const closeBtn = document.getElementById('close');
    const nextBtn = document.getElementById('next');

    let intervalRef = null;

    dialogueUI.style.display = 'block';

    if (text instanceof Array) {
        closeBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        for await (const t of text) {
            intervalRef = await new Promise((res) => {
                nextBtn.removeEventListener('click', () => {
                    res(intervalRef);
                });
                nextBtn.addEventListener('click', () => {
                    res(intervalRef);
                });
                intervalRef = processDialogWithCharacterName(
                    dialogue,
                    characterName,
                    t
                ); // Call function with character name
            });
        }
        nextBtn.style.display = 'none';
    } else {
        intervalRef = processDialogWithCharacterName(
            dialogue,
            characterName,
            text
        ); // Call function with character name
    }

    closeBtn.style.display = 'block';

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = 'none';
        dialogue.innerHTML = '';
        clearInterval(intervalRef);
        closeBtn.removeEventListener('click', onCloseBtnClick);
        focusGameCanvas();
        k.canvas.dispatchEvent(
            new CustomEvent('dialogueClosed', {
                detail: { k, player, characterName, text },
            })
        );
    }

    closeBtn.addEventListener('click', onCloseBtnClick);

    addEventListener('keypress', (key) => {
        if (key.code === 'Enter') {
            closeBtn.click();
        }
    });

    k.canvas.dispatchEvent(
        new CustomEvent('dialogueDisplayed', {
            detail: { k, player, characterName, text },
        })
    );
}

export async function displayDialogueWithoutCharacter({
    k,
    player,
    text,
    onDisplayEnd = () => {},
}) {
    const dialogueUI = document.getElementById('textbox-container');
    const dialogue = document.getElementById('dialogue');
    const closeBtn = document.getElementById('close');

    let intervalRef = null;

    dialogueUI.style.display = 'block';

    intervalRef = processDialog(dialogue, text); // Call function without character name

    closeBtn.style.display = 'block';

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = 'none';
        dialogue.innerHTML = '';
        clearInterval(intervalRef);
        closeBtn.removeEventListener('click', onCloseBtnClick);
        focusGameCanvas();
        k.canvas.dispatchEvent(
            new CustomEvent('dialogueClosed', { detail: { k, player, text } })
        );
    }

    closeBtn.addEventListener('click', onCloseBtnClick);

    addEventListener('keypress', (key) => {
        if (key.code === 'Enter') {
            closeBtn.click();
        }
    });

    k.canvas.dispatchEvent(
        new CustomEvent('dialogueDisplayed', { detail: { k, player, text } })
    );
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    if (resizeFactor < 1) {
        k.camScale(k.vec2(1));
    } else {
        k.camScale(k.vec2(1.5));
    }
}

export function focusGameCanvas() {
    const gameCanvas = document.getElementById('game');
    gameCanvas.focus();
}

export function buildActionModal(sprite, k) {
    const spritePos = sprite.pos;

    const actionModal = k.add([
        k.rect(20, 20),
        k.color(255, 255, 255),
        k.outline(2, k.Color.BLACK),
        k.pos(spritePos.x - 10, spritePos.y - sprite.height - 30),
        k.layer('ui'),
        'action-modal',
    ]);

    const actionLabel = k.add([
        k.text('t', { size: 16, align: 'center' }),
        k.color(0, 0, 0),
        k.pos(actionModal.pos.x + 5, actionModal.pos.y + 4),
        'action-label',
    ]);

    return { actionModal, actionLabel };
}
