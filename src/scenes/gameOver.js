import { k } from '../kplayCtx';


k.scene('gameOver', () => {

    //  need to create 3 components
    //  the overlay background
    //  the text
    //  the exit button 

    const scrollSpeed = 100
    const creditText = 
`
        Asset Credits

        Sprites:
        - Character sprites by 
        - Environment tiles by 

        Author Credits

        Game Design:
        - somethingRandom

        Programming:
        - somethingRandom
        - somethingRandom
        - somethingRandom

        Thank you for playing!
        `
    const background =k.add([
        k.rect(k.width(), k.height(),),
        k.color(0,0,0,0.5),
        k.z(100),
        k.fixed()
    ])
    const text = k.add([
        k.text(creditText,{size:26,width:k.width()*0.5}),
        k.pos(k.width()*0.6, k.height()),
        k.anchor('center'),
        k.color(255,255,255),
        k.z(101)
    ])
    const crossButton = k.add([
        k.text("Exit",{size:32}),
        k.pos(k.width()-35, 35),
        k.anchor('topright'),
        k.z(101),
        k.fixed()
    ])
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
});
