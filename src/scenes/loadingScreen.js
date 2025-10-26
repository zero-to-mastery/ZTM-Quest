export function loadingScreen(k) {
    const startTime = Date.now();
    const LOADING_DURATION = 15000;

    const characters = [
        { name: 'stuart', frames: [0, 4, 2, 8, 1, 6] },
        { name: 'frank', frames: [10, 14, 12, 18, 11, 16] },
        { name: 'junior', frames: [20, 24, 22, 28, 21, 26] },
        { name: 'sarah', frames: [30, 34, 32, 38, 31, 36] },
        { name: 'duke', frames: [40, 44, 42, 48, 41, 46] },
        { name: 'lindsey', frames: [50, 54, 52, 58, 51, 56] },
        { name: 'misterFu', frames: [60, 64, 62, 68, 61, 66] },
        { name: 'jessica', frames: [70, 74, 72, 78, 71, 76] },
        { name: 'jason', frames: [80, 84, 82, 88, 81, 86] },
        { name: 'jacob', frames: [90, 94, 92, 98, 91, 96] },
        { name: 'roger', frames: [150, 154, 152, 158, 151, 156] },
        { name: 'jerry', frames: [160, 164, 162, 168, 161, 166] },
        { name: 'jordan', frames: [170, 174, 172, 178, 171, 176] },
        { name: 'jessie', frames: [180, 184, 182, 188, 181, 186] },
    ];

    const walkingNPCs = [];
    for (let i = 0; i < 3; i++) {
        const charIdx = Math.floor(Math.random() * characters.length);
        const randomChar = characters[charIdx];
        characters.splice(charIdx, 1); // This ensures characters are unique
        walkingNPCs.push({
            character: randomChar,
            startX: -100 - i * 150,
            speed: 60 + Math.random() * 40,
            scale: 2.5 + Math.random() * 1,
        });
    }

    k.loadSprite('characters', './assets/sprites/characters.png', {
        sliceX: 10,
        sliceY: 20,
    });

    const clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push({
            x: Math.random() * k.width(),
            y: 50 + Math.random() * 100,
            speed: 0.3 + Math.random() * 0.5,
            width: 60 + Math.random() * 40,
        });
    }

    const stars = [];
    for (let i = 0; i < 30; i++) {
        stars.push({
            x: Math.random() * k.width(),
            y: Math.random() * 150,
            phase: Math.random() * Math.PI * 2,
        });
    }

    k.onDraw(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / LOADING_DURATION, 1);
        const time = elapsed / 1000;

        const centerX = k.width() / 2;

        const dayNightCycle = Math.abs(Math.sin(time * 0.3));
        const skyColor1 = {
            r: 15 + dayNightCycle * 50,
            g: 15 + dayNightCycle * 80,
            b: 35 + dayNightCycle * 120,
        };
        const skyColor2 = {
            r: 80 + dayNightCycle * 100,
            g: 50 + dayNightCycle * 120,
            b: 120 + dayNightCycle * 135,
        };

        for (let i = 0; i < 10; i++) {
            const ratio = i / 10;
            k.drawRect({
                pos: k.vec2(0, i * (k.height() / 10)),
                width: k.width(),
                height: k.height() / 10,
                color: k.rgb(
                    skyColor1.r + (skyColor2.r - skyColor1.r) * ratio,
                    skyColor1.g + (skyColor2.g - skyColor1.g) * ratio,
                    skyColor1.b + (skyColor2.b - skyColor1.b) * ratio
                ),
            });
        }

        stars.forEach((star) => {
            const twinkle = Math.sin(time * 2 + star.phase) * 0.5 + 0.5;
            k.drawCircle({
                pos: k.vec2(star.x, star.y),
                radius: 1 + twinkle,
                color: k.rgb(255, 255, 200),
                opacity: 0.6 + twinkle * 0.4,
            });
        });

        clouds.forEach((cloud) => {
            cloud.x += cloud.speed;
            if (cloud.x > k.width() + cloud.width) {
                cloud.x = -cloud.width;
            }

            for (let j = 0; j < 3; j++) {
                k.drawCircle({
                    pos: k.vec2(cloud.x + j * 20, cloud.y + Math.sin(j) * 5),
                    radius: 15 + j * 5,
                    color: k.rgb(220, 220, 240),
                    opacity: 0.6,
                });
            }
        });

        for (let x = 0; x < k.width(); x += 40) {
            const hillHeight = Math.sin((x + time * 20) * 0.02) * 40 + 80;
            k.drawRect({
                pos: k.vec2(x, k.height() - hillHeight),
                width: 40,
                height: hillHeight,
                color: k.rgb(60, 80, 120),
            });
        }

        for (let x = 0; x < k.width(); x += 30) {
            const hillHeight = Math.sin((x + time * 30) * 0.03) * 50 + 100;
            k.drawRect({
                pos: k.vec2(x, k.height() - hillHeight),
                width: 30,
                height: hillHeight,
                color: k.rgb(80, 120, 100),
            });
        }

        k.drawRect({
            pos: k.vec2(0, k.height() - 180),
            width: k.width(),
            height: 180,
            color: k.rgb(90, 140, 80),
        });

        for (let i = 0; i < k.width(); i += 8) {
            const grassHeight = 3 + Math.sin((i + time * 50) * 0.5) * 2;
            k.drawRect({
                pos: k.vec2(i, k.height() - 180),
                width: 2,
                height: grassHeight,
                color: k.rgb(70, 160, 70),
            });
        }

        const pathY = k.height() - 140;
        k.drawRect({
            pos: k.vec2(0, pathY),
            width: k.width(),
            height: 30,
            color: k.rgb(160, 130, 100),
        });

        for (let i = 0; i < k.width(); i += 40) {
            k.drawCircle({
                pos: k.vec2(i + ((time * 50) % 40), pathY + 15),
                radius: 4,
                color: k.rgb(140, 110, 80),
            });
        }

        walkingNPCs.forEach((npc) => {
            const charX = npc.startX + time * npc.speed;
            const charY = pathY - 5;

            if (charX > k.width() + 100) {
                npc.startX = -100;
            }

            const walkCycle = Math.floor((time * 4) % 2);
            const frameIndex = npc.character.frames[walkCycle === 0 ? 3 : 2];

            k.drawSprite({
                sprite: 'characters',
                frame: frameIndex,
                pos: k.vec2(charX, charY),
                anchor: 'center',
                scale: npc.scale,
            });

            k.drawText({
                text: npc.character.name.toUpperCase(),
                size: 10,
                font: 'pixelFont',
                pos: k.vec2(charX, charY - 40),
                anchor: 'center',
                color: k.rgb(255, 255, 255),
                opacity: 0.8,
            });
        });

        const logoScale = 2 + Math.sin(time * 2) * 0.2;
        k.drawSprite({
            sprite: 'ztmLogo',
            pos: k.vec2(88, 60),
            anchor: 'center',
            scale: logoScale,
            opacity: 0.85,
        });

        k.drawCircle({
            pos: k.vec2(88, 60),
            radius: 40 + Math.sin(time * 3) * 10,
            color: k.rgb(100, 200, 255),
            opacity: 0.2,
        });

        const titleY = 120;
        k.drawText({
            text: 'ZTM QUEST',
            size: 64,
            font: 'pixelFont',
            pos: k.vec2(centerX + 3, titleY + 3),
            anchor: 'center',
            color: k.rgb(0, 0, 0),
            opacity: 0.5,
        });
        k.drawText({
            text: 'ZTM QUEST',
            size: 64,
            font: 'pixelFont',
            pos: k.vec2(centerX, titleY),
            anchor: 'center',
            color: k.rgb(255, 255, 100),
        });
        k.drawText({
            text: '~ A CODING ADVENTURE ~',
            size: 16,
            font: 'pixelFont',
            pos: k.vec2(centerX, titleY + 50),
            anchor: 'center',
            color: k.rgb(200, 200, 255),
            opacity: Math.sin(time * 2) * 0.3 + 0.7,
        });

        const barY = k.height() - 100;
        const barWidth = Math.min(500, k.width() * 0.6);
        const barHeight = 30;

        k.drawRect({
            pos: k.vec2(centerX - barWidth / 2 - 4, barY - 4),
            width: barWidth + 8,
            height: barHeight + 8,
            color: k.rgb(80, 60, 40),
        });

        k.drawRect({
            pos: k.vec2(centerX - barWidth / 2, barY),
            width: barWidth,
            height: barHeight,
            color: k.rgb(40, 30, 20),
        });

        k.drawRect({
            pos: k.vec2(centerX - barWidth / 2 + 2, barY + 2),
            width: (barWidth - 4) * progress,
            height: barHeight - 4,
            color: k.rgb(255, 215, 0),
        });

        if (progress > 0.1) {
            for (let i = 0; i < 3; i++) {
                const sparkleX =
                    centerX - barWidth / 2 + barWidth * progress - 20 + i * 10;
                const sparkleSize = 2 + Math.sin(time * 5 + i) * 2;
                k.drawCircle({
                    pos: k.vec2(sparkleX, barY + 15),
                    radius: sparkleSize,
                    color: k.rgb(255, 255, 200),
                });
            }
        }

        const dots = '.'.repeat(Math.floor(time * 2) % 4);
        k.drawText({
            text: `LOADING${dots}`,
            size: 20,
            font: 'pixelFont',
            pos: k.vec2(centerX - barWidth / 2, barY - 25),
            color: k.rgb(255, 255, 255),
        });

        k.drawText({
            text: `${Math.floor(progress * 100)}%`,
            size: 28,
            font: 'pixelFont',
            pos: k.vec2(centerX, barY + barHeight + 15),
            anchor: 'center',
            color: k.rgb(255, 215, 0),
        });

        const tips = [
            '💡 TIP: Explore every corner to find secrets!',
            '⚔️ TIP: Talk to NPCs for quests and rewards',
            '🗺️ TIP: Press M to open your map',
            '⚡ TIP: Manage your energy by eating food',
            '🎮 TIP: Use WASD or Arrow keys to move',
        ];
        const tipIndex = Math.floor(elapsed / 3000) % tips.length;

        k.drawRect({
            pos: k.vec2(centerX - 250, k.height() - 45),
            width: 500,
            height: 35,
            color: k.rgb(20, 20, 40),
            opacity: 0.8,
        });

        k.drawText({
            text: tips[tipIndex],
            size: 14,
            font: 'pixelFont',
            pos: k.vec2(centerX, k.height() - 27),
            anchor: 'center',
            color: k.rgb(200, 255, 200),
        });

        if (elapsed >= LOADING_DURATION) {
            k.go('start');
        }
    });
}
