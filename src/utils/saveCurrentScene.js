import { getGameState, setGameState } from "./gameState";

// Function to save current scene to local storage
export const saveScene = (sceneName) => {
    // const playerData = JSON.parse(localStorage.getItem('gameData')) || {}; // Retrieve existing data or initialize an empty object
    // playerData["scene"] = sceneName

    // localStorage.setItem('gameData', JSON.stringify(playerData));
    // console.log(`Scene ${sceneName} saved to local storage.`);

    const gameState = getGameState();
    gameState.player["scene"] = sceneName;
    setGameState(gameState);

}

// Function to save player's position to local storage
export const savePosition = (player) => {
    // const playerData = JSON.parse(localStorage.getItem('gameData')) || {}; // Retrieve existing data or initialize an empty object
    // playerData["position"] = {
    //     x: player.pos.x,
    //     y: player.pos.y
    // }

    // localStorage.setItem('gameData', JSON.stringify(playerData));
    // console.log(`Position (${player.pos.x}, ${player.pos.y}) saved to local storage.`);

    const gameState = getGameState();
    gameState.player["position"] = {
        x: player.pos.x,
        y: player.pos.y
    }
    setGameState(gameState);
}

