import { k } from './kplayCtx';

import './scenes/start';
import { setCamScale } from './utils';


k.onResize(() => {
  setCamScale(k);
});

k.go('start');