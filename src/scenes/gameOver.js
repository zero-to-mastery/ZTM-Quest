import { k } from '../kplayCtx';
import { getAssets, getContributors, getCamScale } from '../utils';

k.scene('gameOver', async () => {

    // helper functions from utils files
    const contributors = await getContributors();
    const assets = await getAssets();

    const creditText = `
Special Thanks To All Of The Contributors!!

${contributors}

Asset Credits

${assets}

Thank you for playing!
`.trim();

    // Getting the camera scale
    const camScale = getCamScale(k);

    // Load the background sprite
    k.loadSprite("backgroundImage", "/exports/maps/academic_building.png");

    
    // logic here is to have the text above everything else, tehn the overlay and then the backgrodun, shoudl work if i go my way

    const background = k.add([
        k.sprite("backgroundImage"),
        k.size(k.width(), k.height()),
        k.pos(0, 0),
        k.scale(1),
        k.z(0),  
        k.fixed()
    ]);

    
    const overlay = k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.color(0, 0, 0, 0.4),  // 40% transparent black
        k.z(50),  
        k.fixed()
    ]);

    // Add the credit text
    const text = k.add([
        k.text(creditText, {
            size: 15 / camScale,
            width: k.width() * 0.9 / camScale,
            lineSpacing: 15 / camScale,
            align: "center"
        }),
        k.anchor('center'),
        k.pos(k.width() * 0.5, k.height() * 0.5),
        k.color(255, 255, 255),
        k.z(101),
        k.scale(camScale)
    ]);

    const crossButton = k.add([
        k.rect(65, 35),
        k.color(255, 0, 0),
        k.anchor('topright'),
        k.z(101),
        k.area(),
        k.scale(1),
    ]);

    const exitText = k.add([
        k.text("Exit", { size: 26 / camScale }),
        k.color(255, 255, 255),
        k.anchor("topright"),
        k.z(102),
        k.scale(camScale)
    ]);

    
    const updateLayout = () => {
        
        // for updating the background
        background.width = k.width();
        background.height = k.height();
        background.scaleTo(k.width() / background.width, k.height() / background.height);

        // for updating the overlay width
        overlay.width = k.width();
        overlay.height = k.height();

        // for the text
        text.pos = k.vec2(k.width() * 0.5, k.height() * 0.5);
        text.width = k.width() * 0.9 / camScale

        // for the cross button and the text in it
        const buttonWidth = crossButton.width;
        const padding = 10;
        crossButton.pos = k.vec2(k.width() - buttonWidth * 0.8 - padding, padding);
        exitText.pos = k.vec2(k.width() - buttonWidth * 0.8 - padding, padding + 5);
    };

    updateLayout();

    k.onResize(() => {
        updateLayout();
    });

    // Scroll logic for the text

    // to explain in leyman terms how this works is
    // the entire screen starts at 0 at the top and goes to the btoom which is k.height() and the text is placed at the bottom of the screen
    // so the text is placed at the bottom of the screen and then the text is moved up by the text height and then the text is moved up by the text height
    // and then the text is moved up by the text height and then the text is moved up by the text height and then the text is moved up by the text height
    const textHeight = text.height * camScale;
    let scrollPosition = -textHeight;
    const scrollSpeed = 40 * camScale;
    const maxScroll = textHeight + k.height() * 1.1;

    k.onUpdate(() => {
        if (scrollPosition < maxScroll) {
            scrollPosition += scrollSpeed * k.dt();
            text.pos.y = k.height() - scrollPosition / camScale;
        } else {
            k.wait(2, () => {
                k.go("start");
            });
        }
    });

    // Exit button hover and click behavior
    crossButton.onHover(() => {
        crossButton.color = k.rgb(255, 255, 255);
        exitText.color = k.rgb(255, 0, 0);
    });

    crossButton.onHoverEnd(() => {
        crossButton.color = k.rgb(255, 0, 0);
        exitText.color = k.rgb(255, 255, 255);
    });
    
    crossButton.onClick(() => {
        k.go("start");
    });

    // key bindings, again for added functionality 
    k.onKeyPress("x", () => {
        k.go("start");
    });
});
