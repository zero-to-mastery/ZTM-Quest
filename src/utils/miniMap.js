import { scaleFactor } from '../constants';

export const drawMinimap = (k, player) => {
    // Get minimap element
    const minimapCanvas = document.getElementById('minimap');
    const minimapCtx = minimapCanvas.getContext('2d');

    const minimapButton = document.getElementById('minimap-button');
    const miniMapVisible = minimapCanvas.style.display === 'block';
    minimapButton.addEventListener('click', () => {
        minimapCanvas.style.display = miniMapVisible ? 'none' : 'block';
        k.canvas.focus();
    });

    // Create new image
    const mapImage = new Image();
    // Get current map
    const [map] = k.get('main_map');
    // Set the image to be drawn to the png of current map
    mapImage.src = map.png;

    // Draw the map title
    const mapName = document.getElementById("minimap-name")
    mapName.innerHTML = miniMapVisible ? map.name : "";

    // Clear previous frame
    minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

    // Calculate scaling factors
    const xScale = minimapCanvas.width / (map.width * scaleFactor);
    const yScale = minimapCanvas.height / (map.height * scaleFactor);

    // Draw the map image
    minimapCtx.drawImage(
        mapImage,
        0,
        0,
        minimapCanvas.width,
        minimapCanvas.height
    );

    // Scale player positions
    const playerMinimapX = player.pos.x * xScale; // Scale player X position
    const playerMinimapY = player.pos.y * yScale; // Scale player Y position


    // Once the sprite is loaded, extract the specific frame for the player's current animation
    const spriteSheet = new Image();
    spriteSheet.src = './assets/sprites/characters.png'; // Load the sprite sheet

    // Draw the specific frame on the minimap
    minimapCtx.drawImage(
        spriteSheet,
        0, 32,   // Source X and Y position on the sprite sheet
        16, 16,  // Source width and height
        playerMinimapX, playerMinimapY - 10,  // Destination X and Y on the minimap canvas
        16, 16 // size on mini-map
    );

};

// Function to toggle the minimap
export const toggleMinimap = (k) => {
    // Get minimap element
    const minimapCanvas = document.getElementById('minimap');
    // Set a true/false variable depending on current minimap status
    const miniMapVisible = minimapCanvas.style.display === 'block';
    // Set minimap on/off depending on current status
    minimapCanvas.style.display = miniMapVisible ? 'none' : 'block';

};
