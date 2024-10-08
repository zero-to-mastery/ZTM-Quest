import { k } from '../kplayCtx';


k.scene('gameOver', () => {

    //  need to create 3 components
    //  the overlay background
    //  the text
    //  the exit button 

    const background =k.add([
        k.rect(k.width(), k.height(),),
        k.color(0,0,0,0.5),
        k.z(100),
        k.fixed()
    ])
    const text = k.add([
        k.text("Credits Scene",{size:32}),
        k.pos(k.width()/2, k.height()/2),
        k.anchor('center'),
        k.color(255,255,255),
        k.z(101),
        k.fixed()
    ])
    const crossButton = k.add([
        k.text("Exit",{size:32}),
        k.pos(k.width()-35, 35),
        k.anchor('topright'),
        k.z(101),
        k.fixed()
    ])

    k.onKeyPress("x", () => {
        k.go("start");
    });
});
