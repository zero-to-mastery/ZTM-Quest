import { k } from '../../../kplayCtx';
import { saveScene } from '../../../utils/saveCurrentScene';

export const attachInteractions = (interactions, gameObjTag) => {
    const map = k.get('main_map')[0];
    const gameObj = k.get(gameObjTag)[0];

    interactions.forEach((cb) => cb(gameObj, k, map));

    // Add onSceneLeave handler to save the scene and player's position when leaving
    k.onSceneLeave((currentScene) => {
        saveScene(currentScene);
    });

};
