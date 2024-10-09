import { scaleFactor } from './constants';

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
            k.canvas.focus();
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
            k.canvas.focus();
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
        k.camScale(k.vec2(scaleFactor));
    }
}

export const buildInteractionPrompt = (sprite, k) => {
    if (k.isTouchscreen()) {
        document.getElementById('interaction-note-mobile').style.display =
            'flex';
    } else {
        document.getElementById('interaction-note').style.display = 'flex';
    }
    const spritePos = sprite.pos;

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

    const map = k.get('main_map')[0];

    map.add([
        k.sprite('question-bubble', { anim: 'float' }),
        k.animate([0, 1, 2, 3, 4, 5, 6, 7]),
        k.area({ collisionIgnore: ['player'] }),
        k.color(255, 255, 255),
        k.outline(2, k.Color.BLACK),
        k.pos(spritePos.x - 5, spritePos.y - sprite.height - 5),
        k.layer('game'),
        k.z(100),
        `question-bubble`,
    ]);
};

export const tearDownInteractionPrompt = (k) => {
    const map = k.get('main_map')[0];

    if (k.isTouchscreen()) {
        document.getElementById('interaction-note-mobile').style.display =
            'none';
    } else {
        document.getElementById('interaction-note').style.display = 'none';
    }

    if (map.get('question-bubble')[0]) {
        map.get('question-bubble')[0].destroy();
    }
};

export const initializeMovementPrompt = (k) => {
    if (k.isTouchscreen()) {
        document.getElementById('note-mobile').style.display = 'flex';
        document.getElementById('note').style.display = 'none';
        document.getElementById('interaction-note').style.display = 'none';
    } else {
        document.getElementById('note').style.display = 'flex';
        document.getElementById('note-mobile').style.display = 'none';
        document.getElementById('interaction-note-mobile').style.display =
            'none';
    }
};
