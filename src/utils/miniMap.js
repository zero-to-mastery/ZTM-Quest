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

    // Draw player market on the map
    minimapCtx.fillStyle = 'red'; // Player marker color
    minimapCtx.fillRect(playerMinimapX, playerMinimapY, 5, 5); // Player marker
};

// Function to toggle the minimap
export const toggleMinimap = () => {
    // Get minimap element
    const minimapCanvas = document.getElementById('minimap');
    // Set a true/false variable depending on current minimap status
    const miniMapVisible = minimapCanvas.style.display === 'block';
    // Set minimap on/off depending on current status
    minimapCanvas.style.display = miniMapVisible ? 'none' : 'block';
};
