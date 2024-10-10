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
    },
});
k.onCustomEvent = (eventName, cb) => {
    k.canvas.addEventListener(eventName, cb.bind(k));
};
k.triggerEvent = (eventName, detail) => {
    k.canvas.dispatchEvent(new CustomEvent(eventName, { detail }));
};

k.onResize(() => {
    setCamScale(k);
});
