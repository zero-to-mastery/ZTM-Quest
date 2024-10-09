import { displayDialogue } from '../../utils';

export const interactionWithGameMachine11 = (player, k, map) =>{
    player.onCollide('game_machine_11', () => {
        player.isInDialog = true;
        showCustomPrompt(
            'Do you want to play the Sinusoid Car Game? Collect trophies and overtake formulas!', // Updated Prompt message
            ['Yes', 'No'], // Options for the game prompt
            (selectedOption) => {
                // Logic based on the selected option
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Sinusoid Car Game... Fasten your belts!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            startChromeFormulaGame(k); // Pass k to the game start function
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            }
        );
    });
}

function showCustomPrompt(message, options, callback) {
    // Set the prompt message
    document.getElementById('prompt-message').textContent = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };

        // Add keyboard event listener for accessibility
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent the default behavior
                callback(option);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}

function startChromeFormulaGame(k) {
    const squareHeight = (k.height() / 3); 
    const squareYPosition = (k.height() / 3);
    const scaleFactor = (k.width() / k.height()) * 2;
    const carCenter = k.height() / 2 - 12 * scaleFactor;
    const carUp = squareYPosition + (squareHeight / 3) / 2 - 12 * scaleFactor;
    const carDown = 2 * squareYPosition - (squareHeight / 3) / 2 - 12 * scaleFactor;
    const values = [carCenter, carUp, carDown];
    let racingMusic;
    let counter;
    let songCounter = 1;
    let speedy = 300;
    let score = 0;
    let trophyCount = 0;
    let lightsOut = false; // Pridáme premennú, ktorá sleduje, či je light5 červené

    // set background color
    k.setBackground(141, 183, 255);

    // load assets
    k.loadSprite("bean", "./assets/sprites/formula.png");
    k.loadSprite('trophy', './assets/sprites/trophy.png');
    k.loadSound("collecttrophy", "./assets/sounds/trophycollected.mp3");
    k.loadSound("carcrash", "./assets/sounds/carcrash.mp3");
    k.loadSound("lightstart", "./assets/sounds/lightstart.mp3");
    k.loadSound("racestart", "./assets/sounds/racestart.mp3");
    k.loadSound("racemusic", "./assets/sounds/racemusic.mp3");
    k.loadSound("racemusic2", "./assets/sounds/racemusic2.mp3");
    k.loadSound("spectators", "./assets/sounds/spectators.mp3");

    k.scene("game", () => {

        lightsOut = false;
        score = 0;
        trophyCount = 0;
        counter = 0;
        // define gravity
        k.setGravity(0);

        k.loadSprite('racemap', './assets/sprites/RaceBackground.png');

        // Pridanie pozadia
        k.add([
            k.sprite('racemap', {
                width: k.width(),
                height: k.height()
            }),
            k.pos(0, 0),
            k.layer('bg'),
        ]);

        // Vytvorenie cesty
        k.add([
            k.rect(k.width(), squareHeight),
            k.outline(4),
            k.pos(0, squareYPosition),
            k.body({ isStatic: true }),
            k.color(55, 55, 55),
        ]);

        k.add([
            k.rect(2 * scaleFactor, squareHeight),
            k.pos(k.width() / 6, k.height() / 3),
            k.body({ isStatic: true }),
            k.color(100, 100, 100),
            k.area(),
            "wall",
        ]);

        k.loadSprite('bean', './assets/sprites/newformulasheet.png', {
            sliceX: 81,
            sliceY: 1,
            anims: {
                run: { from: 0, to: 80, loop: true, speed: 10 },
            },
        });

        const player = k.add([
            k.sprite('bean', { anim: 'run' }),
            k.pos(k.width() / 4, k.height() / 2 - 12 * scaleFactor),
            k.area(),
            k.body(),
            k.scale(scaleFactor),
            "player",
        ]);

        function changeLine() {
            if(lightsOut){
                if (player.pos.y == values[0]) {
                    if (counter == 0) {
                        player.pos.y = values[1];
                        counter = 1;
                    } 
                    else if (counter == 1) {
                        player.pos.y = values[2];
                        counter = 0;
                    }
                } else if (player.pos.y == values[1]) {
                    player.pos.y = values[0];
                } else if (player.pos.y == values[2]) {
                    player.pos.y = values[0];
                }
            }
        }

        // jump when user presses space or clicks
        k.onKeyPress("space", changeLine);
        k.onClick(changeLine);

        function getRandomValue() {
            const randomIndex = Math.floor(Math.random() * values.length);
            return values[randomIndex];
        }

        function spawnCar() {
            // Spawning auta alebo trofeje po červenej zmene svetla
            if (!lightsOut) return; // Ak nie je červené, nevykoná spawn
        
            // Náhodný výber medzi autom alebo trofejou
            const spawnTrophy = Math.random() < 0.5; // 50% šanca na trofej
        
            if (spawnTrophy) {
                // Spawn trofeje
                var trophy = k.add([
                    k.sprite("trophy"),  // Nahraď "trophy" vhodným assetom pre trofej
                    k.area(),
                    k.pos(k.width(), getRandomValue()),
                    k.move(k.LEFT, speedy),
                    k.scale(scaleFactor),
                    "trophy",
                ]);

                trophy.onCollide("player", () => {
                    trophy.destroy();
                    k.play("collecttrophy", {
                        volume: 0.5, // set the volume to 50%
                        speed: 1, // speed up the sound
                        loop: false, // loop the sound
                    })
                });
        
                trophy.onCollide("wall", () => {
                    trophy.destroy();
                });

                
        
            } else {
                // Spawn auta
                var car = k.add([
                    k.sprite("bean"),
                    k.area(),
                    k.pos(k.width(), getRandomValue()),
                    k.move(k.LEFT, speedy),
                    k.scale(scaleFactor),
                    "car",
                ]);
        
                car.onCollide("wall", () => {
                    car.destroy();
                });
            }
        
            // Po čase znovu spawnuje auto alebo trofej
            k.wait(k.rand(5, 3), spawnCar);
        }

        function addLights() {
            var light1 = k.add([
                k.circle(((squareHeight / 5) / 2) / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos((k.width() / 6) / 2, squareHeight + squareHeight / 6),
                "light1",
            ]);
        
            var light2 = k.add([
                k.circle(((squareHeight / 5) / 2) / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos((k.width() / 6) / 2, squareHeight + 2 * (squareHeight / 6)),
                "light2",
            ]);
        
            var light3 = k.add([
                k.circle(((squareHeight / 5) / 2) / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos((k.width() / 6) / 2, squareHeight + 3 * (squareHeight / 6)),
                "light3",
            ]);
        
            var light4 = k.add([
                k.circle(((squareHeight / 5) / 2) / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos((k.width() / 6) / 2, squareHeight + 4 * (squareHeight / 6)),
                "light4",
            ]);
        
            var light5 = k.add([
                k.circle(((squareHeight / 5) / 2) / 1.5),
                k.outline(4),
                k.color(0, 0, 0),
                k.area(),
                k.pos((k.width() / 6) / 2, squareHeight + 5 * (squareHeight / 6)),
                "light5",
            ]);
        
            // Zmena farby svetiel
            k.wait(1, () => {
                light1.color = k.rgb(255, 0, 0);
                k.play("lightstart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
            });
        
            k.wait(2, () => {
                light2.color = k.rgb(255, 0, 0);
                k.play("lightstart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
            });
        
            k.wait(3, () => {
                light3.color = k.rgb(255, 0, 0);
                k.play("lightstart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
            });
        
            k.wait(4, () => {
                light4.color = k.rgb(255, 0, 0);
                k.play("lightstart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
            });
        
            k.wait(5, () => {
                light5.color = k.rgb(255, 0, 0);
                k.play("lightstart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
                //spawnCar(); // Teraz spawnuje autá
            });

            k.wait(7, () => {
                light1.color = k.rgb(0, 0, 0);
                light2.color = k.rgb(0, 0, 0);
                light3.color = k.rgb(0, 0, 0);
                light4.color = k.rgb(0, 0, 0);
                light5.color = k.rgb(0, 0, 0);
                lightsOut = true; // Svetlo light5 sa zmenilo na červenú, môže sa spustiť spawn
                k.play("racestart", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })
                spawnCar(); // Teraz spawnuje autá
            });

            k.wait(8, () => {
                racingMusic = k.play("racemusic", {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: true, // loop the sound
                })
                //spawnCar(); // Teraz spawnuje autá
            });

            
        }

        function addDashedLine(speedy) {
            const lineHeight = 2 * scaleFactor; // výška čiary
            const segmentWidth = 10 * scaleFactor; // šírka jednej čiarky
            let currentOffset = 0; // aktuálny offset na posunutie ciar
            const segments = []; // array na uloženie referencií na segmenty
            let forward = true; // určuje smer - dopredu alebo späť
        
            const upLine = squareYPosition + (squareHeight / 3);
            const downLine = squareYPosition + 2 * (squareHeight / 3);
        
            // Funkcia na výpočet dynamického intervalu na základe rýchlosti
            function calculateInterval(speedy) {
                const minInterval = 0.05; // minimálny interval (aby to nebolo príliš rýchle)
                const baseInterval = 0.1; // základný interval pre rýchlosť 1
                return Math.max(minInterval, baseInterval / speedy);
            }
        
            function drawDashedLines(offset) {
                // Najprv odstráň všetky aktuálne segmenty
                segments.forEach(segment => {
                    segment.destroy();
                });
                segments.length = 0; // Vyprázdni array segmentov
        
                // Pridanie vrchnej prerušovanej čiary s posunom
                for (let x = k.width() / 6 + 2 * scaleFactor + offset; x < k.width(); x += segmentWidth + segmentWidth) {
                    const segment = k.add([
                        k.rect(segmentWidth, lineHeight),
                        k.pos(x, upLine),
                        k.color(255, 255, 255), // farba čiary (biela)
                        k.area(),
                        "dashedLine",
                    ]);
                    segments.push(segment); // Uloženie segmentu do array
                }
                // Pridanie spodnej prerušovanej čiary s posunom
                for (let x = k.width() / 6 + 2 * scaleFactor + offset; x < k.width(); x += segmentWidth + segmentWidth) {
                    const segment = k.add([
                        k.rect(segmentWidth, lineHeight),
                        k.pos(x, downLine),
                        k.color(255, 255, 255), // farba čiary (biela)
                        k.area(),
                        "dashedLine",
                    ]);
                    segments.push(segment); // Uloženie segmentu do array
                }
            }
        
            // Funkcia, ktorá sa bude opakovať podľa dynamického intervalu
            function updateDashedLines() {
                // Vykresli čiary s aktuálnym offsetom
                drawDashedLines(currentOffset);
        
                // Ak sme vpred, posúvame offset dopredu, inak dozadu
                if(lightsOut){
                    if (forward) {
                        currentOffset += segmentWidth;
                        if (currentOffset >= segmentWidth) { // limit je teraz 1 segment
                            forward = false;
                        }
                    } else {
                        currentOffset -= segmentWidth;
                        if (currentOffset <= 0) { // ak sa vráti na začiatok, zmeň smer
                            forward = true;
                        }
                    }
                }
        
                // Vypočítaj dynamický interval na základe rýchlosti
                const interval = calculateInterval(speedy);
        
                // Znova spusti cyklus s novým intervalom
                k.wait(interval, updateDashedLines);
            }
        
            // Spustenie prvého cyklu
            updateDashedLines();
        }

        addLights();
        addDashedLine(1);

        const textLabel = k.add([
            k.text("Sinusoid Car", {
                size: ((k.height() / 3) / 3) / 2,
            }),
            k.pos(k.width(), k.height() / 2),
            k.move(k.LEFT, speedy),
            k.offscreen({ destroy: true }),
            k.area(),
            //k.body(),
        ]);

        player.onCollide("car", () => {
            speedy = 300;
            //counter = 0;
            k.go("lose", score);
            racingMusic.stop();
            k.play("carcrash", {
                volume: 0.5, // set the volume to 50%
                speed: 1, // speed up the sound
                loop: false, // loop the sound
            })
            k.addKaboom(player.pos);
        });

        textLabel.onCollide("wall", () => {
            textLabel.destroy();
        });

        player.onCollide("trophy", () => {
            trophyCount++;
        });


        const scoreLabel = k.add([
            k.text(`Score: ${score}`),
            k.pos(k.width() / 2, k.height() / 4),
        ]);

        const trophyLabel = k.add([
            k.text(`Trophies: ${trophyCount}`),
            k.pos(k.width() / 2, 3*(k.height() / 4)),
        ]);

        k.onUpdate(() => {
            if(lightsOut){
                score++;
            }

            if(score != 0 && score%1000 == 0){
                

                k.play("spectators", {
                    volume: 1, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: false, // loop the sound
                })

                let currentSong = "racemusic2";

                if(songCounter == 0){
                    currentSong = "racemusic";
                    songCounter = 1;
                }else{
                    currentSong = "racemusic2";
                    songCounter = 0;
                }
                
                racingMusic.stop();
                racingMusic = k.play(currentSong, {
                    volume: 0.5, // set the volume to 50%
                    speed: 1, // speed up the sound
                    loop: true, // loop the sound
                })
            }
            scoreLabel.text = `Score: ${score}`;
            trophyLabel.text = `Tophies: ${trophyCount}`;
            scoreLabel.pos.x = (k.width() / 2) - (scoreLabel.width / 2);
            trophyLabel.pos.x = (k.width() / 2) - (trophyLabel.width / 2);
            textLabel.pos.y = (k.height() / 2) - textLabel.height / 2 + (2 * scaleFactor);
            speedy += 0.1 * scaleFactor;
        });
    });

    k.scene("lose", (score) => {
        k.add([
            k.sprite("bean"),
            k.pos(k.width() / 2, k.height() / 2 - 64),
            k.scale(2),
            k.anchor("center"),
        ]);

        k.add([
            k.text(score),
            k.pos(k.width() / 2, k.height() / 2 + 64),
            k.scale(2),
            k.anchor("center"),
        ]);

        // Add "Play Again" button
        const playAgainButton = k.add([
            k.text('Play Again'),
            k.pos(k.width() / 2, k.height() / 2 + 140),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        // Add "Play Again" button
        const exitButton = k.add([
            k.text('Exit'),
            k.pos(k.width() / 2, k.height() / 2 + 200),
            k.scale(1),
            k.area(),
            k.anchor('center'),
        ]);

        // When the button is clicked or space is pressed, restart the game
        playAgainButton.onClick(() => {
            startChromeFormulaGame(k); // Restart the game
        });

        exitButton.onClick(() => {
            import('../../scenes/arcade').then((_) => {
                k.go('arcade');
            });
        });

        k.onKeyPress("space", () => k.go("game"));
        k.onClick(() => k.go("game"));
    });

    k.go("game");
}

