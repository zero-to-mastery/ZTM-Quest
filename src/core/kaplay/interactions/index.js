import { k } from '../../../kplayCtx';

export const attachInteractions = (interactions, gameObjTag) => {
    const map = k.get('main_map')[0];
    const gameObj = k.get(gameObjTag)[0];

    interactions.forEach((cb) => cb(gameObj, k, map));

    // Function to save current scene and player's position to local storage
    function saveSceneAndPositionToLocalStorage(sceneName, player) {
        const playerData = {
            scene: sceneName,
            position: {
                x: player.pos.x,
                y: player.pos.y
            }
        };

        localStorage.setItem('gameData', JSON.stringify(playerData));
        console.log(`Scene ${sceneName} and position (${player.pos.x}, ${player.pos.y}) saved to local storage.`);
    }

    // Add onSceneLeave handler to save the scene and player's position when leaving
    k.onSceneLeave((currentScene) => {
        const player = k.get('player')[0]; 
        if (player) {
            saveSceneAndPositionToLocalStorage(currentScene, player);
        }
    });
};
