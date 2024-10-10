import { k } from '../kplayCtx';
import { getAssets,getContributors,hideInstructions } from '../utils';

k.scene('gameOver', async () => {

    //  need to create 3 components
    //  the overlay background
    //  the text
    //  the exit button 

    

    const scrollSpeed = 70
    const contributors = await getContributors()
    const assets = await getAssets() 

    hideInstructions()

    const creditText =`
Special Thanks To All Of The Contributors!!

${contributors}

Asset Credits

${assets}

Thank you for playing!
`.trim()
    const background =k.add([
        k.rect(k.width(), k.height(),),
        k.color(0,0,0,0.5),
        k.z(100),
        k.fixed()
    ])
    const text = k.add([
        k.text(creditText,{size:26,width:k.width()*0.7,lineSpacing:15,align:"center"}),
        k.pos(k.width()*0.5, k.height()*1.5),
        k.anchor('center'),
        k.color(255,255,255),
        k.z(101)
    ])

    const crossButton = k.add([
        k.rect(65,35),
        k.color(255,0,0),
        k.pos(k.width()-35, 30),
        k.anchor('topright'),
        k.z(101),
        k.area(),
        k.scale(1),
        k.fixed()
    ])

    const exitText = k.add([
        k.text("Exit",{size:26}),
        k.color(255,255,255),
        k.anchor("topright"),
        k.pos(k.width()-35, 35),
        k.z(102),

    ])


    // function to add functionality to the scenes
    const textHeight = text.height
    let scrollComplete = false
    k.onUpdate(() => {
        if(!scrollComplete){
        text.pos.y -= scrollSpeed * k.dt()
        if (text.pos.y < -textHeight) {
                text.pos.y = -textHeight
                scrollComplete = true
                k.go("start");
            }
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
});
