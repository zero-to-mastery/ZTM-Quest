import { k } from '../kplayCtx';

// Mobile menu related
const leftPanel = document.getElementById('left-panel');

const showMiscMenu = () => {
    leftPanel.classList.add('show-misc-menu');
};

const hideMiscMenu = () => {
    leftPanel.classList.remove('show-misc-menu');
    k.canvas.focus(); // This ensures every time misc menu is closed then the canvas get back the focus.
};

const miscMenuButton = document.getElementById('misc-menu-button');
const closeBtn = leftPanel.getElementsByClassName('close-btn')[0];
miscMenuButton.addEventListener('click', showMiscMenu);
closeBtn.addEventListener('click', hideMiscMenu);

// Alert window

const showAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.add('display-flex');
};

const hideAlertWindow = () => {
    const alertWindow = document.querySelector('.alert-window');
    alertWindow.classList.remove('display-flex');
    hideMiscMenu(); // This is for the mobile view.
};

// Help related

const showHelp = () => {
    showAlertWindow();
    const helpAlert = document.querySelector('.help-alert');
    helpAlert.classList.add('display-block');
};

const hideHelp = () => {
    const helpAlert = document.querySelector('.help-alert');
    helpAlert.classList.remove('display-block');
    hideAlertWindow();
};

const helpButton = document.getElementById('help-button');
helpButton.addEventListener('click', showHelp);
const helpCloseButton = document.getElementById('help-close-button');
helpCloseButton.addEventListener('click', hideHelp);