import { displayDialogue } from '../../utils';

const getRandomMessage = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const messages = [
    ["Hey! Watch where you're kicking!"],
    ['Goal vibes only!'],
    ['You think you can bend it like Beckham?'],
    ['Ouch! That tickled!'],
    ['Keep me rolling, champ!'],
    ["I'm ready for the World Cup!"],
    ['Nice touch! Want to try a trick shot?'],
    ['You’ve got good footwork!'],
    ["Don't leave me sitting here, let's play! 🏃‍♂️💨"],
];

export const interactionWithSoccerBall = (player, k, map) => {
    player.onCollide('soccerBall', () => {
        const randomMessage = getRandomMessage(0, messages.length - 1);

        displayDialogue({
            k,
            player,
            text: messages[randomMessage],
        });
    });
};
