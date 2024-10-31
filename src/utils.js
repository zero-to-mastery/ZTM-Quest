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
}) {
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
        time.paused = false;
        abort.abort();
        dialogUI.style.display = 'none';
        dialog.innerHTML = '';
        statsUI.style.display = 'flex';
        closeBtn.removeEventListener('click', onCloseBtnClick);
        k.triggerEvent('dialog-closed', { player, characterName, text });
        player.state.isInDialog = false;
        k.canvas.focus();
    }
    closeBtn.addEventListener('click', onCloseBtnClick);

    addEventListener('keydown', (key) => {
        if (key.code === 'Enter') {
            document.activeElement.click();
        }
        if (key.code === 'Escape') {
            closeBtn.click();
        }
    });
    k.triggerEvent('dialog-displayed', { player, characterName, text });
}

export async function displayPermissionBox({
    k,
    player,
    text,
    onDisplayEnd = () => {},
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
    nextBtn.innerHTML = 'Yes';
    statsUI.style.display = 'none';
    miniMapUI.style.display = 'none';
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
            statsUI.style.display = 'flex';
            closeBtn.removeEventListener('click', onCloseBtnClick);
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            player.state.isInDialog = false;
            time.paused = false;

            k.canvas.focus();
            resolve(false); // Resolve with false when "No" is clicked
        }

        function onNextBtnClick() {
            onDisplayEnd();
            abort.abort();
            dialogUI.style.display = 'none';
            dialog.innerHTML = '';
            statsUI.style.display = 'flex';
            nextBtn.removeEventListener('click', onNextBtnClick);
            closeBtn.removeEventListener('click', onCloseBtnClick);
            closeBtn.innerHTML = 'Close';
            nextBtn.innerHTML = 'Next';
            player.state.isInDialog = false;
            time.paused = false;

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
export const buildInteractionPrompt = (sprite, k) => {
    const info = document.getElementById('interaction-info');
    info.style.display = 'flex';

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
    const info = document.getElementById('interaction-info');
    info.style.display = 'none';

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
