import { k } from './kplayCtx';

import './scenes/start';
import { setCamScale } from './utils';
import './styles/global.css';

k.onResize(() => {
    setCamScale(k);
});

k.go('start');
