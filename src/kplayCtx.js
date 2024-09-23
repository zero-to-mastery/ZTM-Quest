import kaplay from 'kaplay';

export const k = kaplay({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game'),
  debugKey: 'f8',

})

export const setGlobalEvents = (cb = () => { }) => {
  cb();
}