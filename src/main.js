import { k } from './kplayCtx';

import './scenes/start';
import './scenes/forest';
import { setCamScale } from './utils';
import './styles/global.css';

k.onResize(() => {
    setCamScale(k);
});

k.go('forest');
