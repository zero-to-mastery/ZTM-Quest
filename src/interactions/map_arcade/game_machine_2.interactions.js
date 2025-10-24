import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { updateAchievements } from '../../utils/achievementsUpdate';

let abort;

export const interactionWithGameMachine2 = (player, k, map) => {
    player.onCollide('game_machine_2', () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        showCustomPrompt(
            'Do you want to play the Word Guessing Game?',
            ['Yes', 'No'],
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    displayDialogue({
                        k,
                        player,
                        text: ['Starting the Word Guessing Game... Good luck!'],
                        onDisplayEnd: () => {
                            startWordGuessingGame(k);
                            updateAchievements(
                                'Arcade gamer',
                                'Game machine 2'
                            );
                        },
                    });
                } else {
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
                    });
                }
            },
            player,
            k,
            abort
        );
    });
};

function startWordGuessingGame(k) {
    const MAX_ATTEMPTS = 8;
    // const words = [
    //     'SPIDERMAN', 'IRONMAN', 'CAPTAIN', 'THOR', 'BLACKWIDOW',
    //     'HULK', 'BLACKPANTHER', 'DOCTORSTRANGE', 'ANTMAN', 'WASP'
    // ];

    // const words = [
    //     'Spider-Man',
    //     'Iron Man',
    //     'Captain America',
    //     'Thor',
    //     'Black Widow',
    //     'Hulk',
    //     'Black Panther',
    //     'Doctor Strange',
    //     'Ant-Man',
    //     'Wasp',
    //     'Vision',
    //     'Scarlet Witch',
    //     'Hawkeye',
    //     'Gamora',
    //     'Star-Lord',
    //     'Rocket Raccoon',
    //     'Drax',
    //     'Nebula',
    //     'Loki',
    //     'Thanos',
    //     'Nick Fury',
    //     'Maria Hill',
    //     'Falcon',
    //     'Winter Soldier',
    //     'Shuri',
    //     'Pepper Potts',
    //     'Gamora',
    //     'Mantis',
    //     'Karnak',
    //     'Groot',
    //     'Psylocke',
    //     'Colossus',
    //     'Storm',
    //     'Jean Grey',
    //     'Cyclops',
    //     'Wolverine',
    //     'Beast',
    //     'Rogue',
    //     'Deadpool',
    //     'Daredevil',
    //     'Luke Cage',
    //     'Jessica Jones',
    //     'Iron Fist',
    //     'Blade',
    //     'Ghost Rider',
    //     'Ms. Marvel',
    //     'Captain Marvel',
    //     'Black Knight',
    //     'Silver Surfer',
    //     'Nova',
    //     'Moon Knight',
    // ];

    const words = [
        'SPIDERMAN',
        'IRONMAN',
        'CAPTAINAMERICA',
        'THOR',
        'BLACKWIDOW',
        'HULK',
        'BLACKPANTHER',
        'DOCTORSTRANGE',
        'ANTMAN',
        'WASP',
        'VISION',
        'SCARLETWITCH',
        'HAWKEYE',
        'GAMORA',
        'STARLORD',
        'ROCKETRACCOON',
        'DRAX',
        'NEBULA',
        'LOKI',
        'THANOS',
        'NICKFURY',
        'MARIAHILL',
        'FALCON',
        'WINTERSOLDIER',
        'SHURI',
        'PEPPERPOTTS',
        'MANTIS',
        'KARNAK',
        'GROOT',
        'PSYLOCKE',
        'COLOSSI',
        'STORM',
        'JEANGREY',
        'CYCLOPS',
        'WOLVERINE',
        'BEAST',
        'ROGUE',
        'DEADPOOL',
        'DAREDEVIL',
        'LUKECAGE',
        'JESSICAJONES',
        'IRONFIST',
        'BLADE',
        'GHOSTRIDER',
        'MSMARVEL',
        'CAPTAINMARVEL',
        'BLACKKNIGHT',
        'SILVERSURFER',
        'NOVA',
        'MOONKNIGHT',
    ];

    const hintForGuess = [
        'the web guy.', // Spider-Man
        'genius billionaire playboy.', // Iron Man
        'the first avenger.', // Captain America
        'god of thunder.', // Thor
        'the deadly spy.', // Black Widow
        'the strongest Avenger.', // Hulk
        'king of Wakanda.', // Black Panther
        'master of the mystic arts.', // Doctor Strange
        'the shrinking hero.', // Ant-Man
        'the flying hero.', // Wasp
        'the synthezoid hero.', // Vision
        'the chaos witch.', // Scarlet Witch
        'the sharpshooter.', // Hawkeye
        'the green assassin.', // Gamora
        'the charming outlaw.', // Star-Lord
        'the raccoon with a gun.', // Rocket Raccoon
        'the destroyer.', // Drax
        'the daughter of Thanos.', // Nebula
        'the trickster god.', // Loki
        'the mad titan.', // Thanos
        'the spy master.', // Nick Fury
        'the agent with a plan.', // Maria Hill
        'the winged warrior.', // Falcon
        'the soldier in the ice.', // Winter Soldier
        'the tech genius of Wakanda.', // Shuri
        'the CEO of Stark Industries.', // Pepper Potts
        'the empathic hero.', // Mantis
        'the Inhuman with the powers.', // Karnak
        'the talking tree.', // Groot
        'the telepathic mutant.', // Psylocke
        'the metal giant.', // Colossus
        'the weather goddess.', // Storm
        'the telekinetic mutant.', // Jean Grey
        'the leader of the X-Men.', // Cyclops
        'the clawed mutant.', // Wolverine
        'the agile mutant.', // Beast
        'the southern belle.', // Rogue
        'the merc with a mouth.', // Deadpool
        'the blind lawyer.', // Daredevil
        'the bulletproof hero.', // Luke Cage
        'the private investigator.', // Jessica Jones
        'the martial arts master.', // Iron Fist
        'the vampire hunter.', // Blade
        'the spirit of vengeance.', // Ghost Rider
        'the new superhero.', // Ms. Marvel
        'the cosmic hero.', // Captain Marvel
        'the noble warrior.', // Black Knight
        'the herald of Galactus.', // Silver Surfer
        'the human rocket.', // Nova
        'the knight of the moon.', // Moon Knight
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    const hint = hintForGuess[randomIndex];
    let attempts = 0;
    let feedbackText;

    // console.log(`The correct answer is: ${randomWord}`); // Log the correct answer
    // k.debug.log(`The correct answer is: ${randomWord}`); // Log the correct answer again

    k.scene('wordGuessing', () => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text(`Guess the word!`, {
                size: 24,
            }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);

        const input = k.add([
            k.text('Enter Guess: ', { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        feedbackText = k.add([
            k.text(
                `Your guess will appear here (${randomWord.length} letters)... hint : ${hint}`,
                { size: 24 }
            ),
            k.pos(centerX, centerY + 100 + offsetY),
            k.anchor('center'),
        ]);

        let currentGuess = '';

        k.onKeyPress('enter', () => {
            if (currentGuess.length > 0) {
                attempts++;
                if (currentGuess === randomWord) {
                    k.go('win', attempts);
                } else if (attempts >= MAX_ATTEMPTS) {
                    k.go('lose', randomWord);
                } else {
                    feedbackText.text = `Wrong guess! Attempts left: ${MAX_ATTEMPTS - attempts}`;
                }
                currentGuess = '';
            }
        });

        k.onKeyPress((key) => {
            if (key === 'backspace') {
                currentGuess = currentGuess.slice(0, -1);
            } else if (currentGuess.length < randomWord.length) {
                currentGuess += key.toUpperCase(); // Convert to uppercase
            }
            input.text = `Enter Guess: ${currentGuess}`;
        });

        k.onKeyPress('escape', () => {
            k.go('arcade');
        });
    });

    k.scene('win', (attempts) => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text('Congratulations! You guessed the word!', { size: 32 }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);
        k.add([
            k.text(`Attempts: ${attempts}`, { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        const playAgainButton = k.add([
            k.text('Play Again', { size: 24 }),
            k.pos(centerX, centerY + 80 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        playAgainButton.onClick(() => startWordGuessingGame(k));

        const exitButton = k.add([
            k.text('Exit', { size: 24 }),
            k.pos(centerX, centerY + 140 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        exitButton.onClick(() => k.go('arcade'));
    });

    k.scene('lose', (number) => {
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;
        const offsetY = -100;

        k.add([
            k.text('Game Over! You ran out of attempts.', { size: 32 }),
            k.pos(centerX, centerY - 100 + offsetY),
            k.anchor('center'),
        ]);
        k.add([
            k.text(`The word was: ${number}`, { size: 32 }),
            k.pos(centerX, centerY + offsetY),
            k.anchor('center'),
        ]);

        // console.log(`The correct answer is: ${number}`); // Log the correct answer again
        k.debug.log(`The correct answer is: ${number}`); // Log the correct answer again

        const playAgainButton = k.add([
            k.text('Play Again', { size: 24 }),
            k.pos(centerX, centerY + 80 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        playAgainButton.onClick(() => startWordGuessingGame(k));

        const exitButton = k.add([
            k.text('Exit', { size: 24 }),
            k.pos(centerX, centerY + 140 + offsetY),
            k.anchor('center'),
            k.area(),
        ]);
        exitButton.onClick(() => k.go('arcade'));
    });

    k.go('wordGuessing');
}
