import kaplay from 'kaplay';
import { setCamScale } from './utils';

export const k = kaplay({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById('game'),
    debugKey: 'f8',
    buttons: {
        up: { keyboard: ['w', 'up'], gamepad: 'north' },
        down: { keyboard: ['s', 'down'], gamepad: 'south' },
        left: { keyboard: ['a', 'left'], gamepad: 'west' },
        right: { keyboard: ['d', 'right'], gamepad: 'east' },
        map: { keyboard: ['m'] },
        backpack: { keyboard: ['i'] },
        credits: { keyboard: ['o'] },
    },
    loadingScreen: false,
    background: [15, 15, 35],
});

k.loadSprite('ztmLogo', './assets/sprites/favicon-32x32.png');

export const time = {
    minutes: 0,
    seconds: 0,
    paused: false,
    pause() {
        this.paused = true;
    },
    unpause() {
        this.paused = false;
    },
    addHours(hoursToAdd) {
        this.minutes += hoursToAdd;
    },
    addMinutes(minutesToAdd) {
        this.seconds += minutesToAdd;
    },
    reset() {
        this.minutes = 0;
        this.seconds = 0;
    },
};

k.loadFont('pixelFont', './assets/fonts/PixelifySans-VariableFont_wght.ttf');

k.onCustomEvent = (eventName, cb) => {
    k.canvas.addEventListener(eventName, cb.bind(k));
};

k.triggerEvent = (eventName, detail) => {
    k.canvas.dispatchEvent(new CustomEvent(eventName, { detail }));
};

k.onResize(() => {
    setCamScale(k);
});
