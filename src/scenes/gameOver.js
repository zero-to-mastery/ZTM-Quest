import { k } from '../kplayCtx';
import { getAssets,getContributors , getCamScale } from '../utils';

k.scene('gameOver', async () => {

    //  need to create 3 components
    //  the overlay background
    //  the text
    //  the exit button 


    const contributors = await getContributors()
    const assets = await getAssets() 

    const creditText =`
Special Thanks To All Of The Contributors!!

${contributors}

Asset Credits

${assets}

Thank you for playing!
`.trim()

    const camScale = getCamScale(k);
    const background =k.add([
        k.rect(k.width(), k.height()),
        k.color(0,0,0,0.5),
        k.z(100),
        k.fixed()
    ])
    const text = k.add([
        k.text(creditText,{size:15/camScale,width:k.width()*0.7/camScale,lineSpacing:15/camScale,align:"center"}),
        k.anchor('center'),
        k.color(255,255,255),
        k.z(101),
        k.scale(camScale)
    ])

    const updateTextPosition = () => {
        text.pos = k.vec2(k.width() * 0.5, k.height() * 0.5); // Center the text
    };

    // Initial position update
    updateTextPosition();

    // Update positions on resize
    k.onResize(() => {
        background.width = k.width(); // Update background width
        background.height = k.height(); // Update background height
        updateTextPosition();

        const newSize = Math.max(12, 15 / getCamScale(k)); // Minimum size of 12
        text.text = creditText; // Reset text to apply new size
        text.size = newSize;
        // Update exit button position as well
        updateExitButtonPosition();
    });


    const crossButton = k.add([
        k.rect(65,35),
        k.color(255,0,0),
        k.anchor('topright'),
        k.z(101),
        k.area(),
        k.scale(1),
    ]);

    const exitText = k.add([
        k.text("Exit",{size:26/camScale}),
        k.color(255,255,255),
        k.anchor("topright"),
        k.z(102),
        k.scale(camScale)

    ])


    // function to add functionality to the scenes
    const textHeight = text.height * camScale
    let scrollPosition = -textHeight
    const scrollSpeed = 40 * camScale
    const maxScroll = textHeight + k.height()*1.1 // Total scroll distance
    
    k.onUpdate(() => {
        if (scrollPosition < maxScroll) {
            scrollPosition += scrollSpeed * k.dt()
            text.pos.y = k.height() - scrollPosition / camScale
        } else {
            k.wait(2, () => { // Wait for 2 seconds before going back to start
                k.go("start")
            })
        }
    })

    k.onKeyPress("x", () => {
        k.go("start");
    });
    crossButton.onHover(()=>{
        crossButton.color=k.rgb(255,255,255)
        exitText.color=k.rgb(255,0,0)
    })
    crossButton.onHoverEnd(()=>{
        crossButton.color=k.rgb(255,0,0)
        exitText.color=k.rgb(255,255,255)
    })

    crossButton.onClick(()=>{
        k.go("start")
    })

    const updateExitButtonPosition = () => {
        const buttonWidth = crossButton.width;
        const padding = 10; // Padding from the edges
    
        crossButton.pos = k.vec2(k.width() - buttonWidth*0.7 - padding, padding);
        exitText.pos = k.vec2(k.width() - buttonWidth*0.7 - padding, padding + 5); // Adjusting for text height
    };
    
    // Initial position update
    updateExitButtonPosition();
    
    // Update positions on resize
    k.onResize(() => {
        updateExitButtonPosition();
    });
});
