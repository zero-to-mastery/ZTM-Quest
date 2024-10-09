import { k } from './kplayCtx';

import { setCamScale } from './utils';
import './styles/global.css';
import { startScene } from './scenes/start';

k.onResize(() => {
    setCamScale(k);
});

startScene({ k });

//k.go('start', { k });
// To test different maps instead of going through each and every scene to get to yours,
// Import the scene builder function
// you can pass also a spawn point as an additional tag like
// startScene({ k, enter_tag: 'spawn_left' });

/*
    Available scenes:
    Start - startScene
    City - cityScene
    Arcade - arcadeScene
    Forest Junction - forestJunctionScene
    Forest - forestScene
    Campus House - campusHouse1Scene


    Spawn Points
    Start - spawn_left, spawn_right
    City - spawn_left, spawn_top, spawn_arcade, spawn_right, spawn_office_left, spawn_office_right
    Arcade - player (No need to add a tag)
    Forest Junction - spawn_bottom, spawn_top, spawn_right
    Forest - spawn_bottom, spawn_topright, spawn_topleft
    Campus House - player (No need to add a tag)
*/
