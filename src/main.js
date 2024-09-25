import { k } from './kplayCtx';

import './scenes/start';
import './scenes/city';
import { setCamScale } from './utils';


k.onResize(() => {
  setCamScale(k);
});

k.go('start');