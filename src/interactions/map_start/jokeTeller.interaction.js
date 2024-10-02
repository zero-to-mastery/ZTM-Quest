import { displayDialogueWithCharacter } from '../../utils';

export const interactionWithJokeTeller = (player, k, map) => {
    player.onCollide('jokeTellerNpc', () => {
        fetchJoke(player, k);
    });
};

const fetchJoke = async (player, k) => {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jokeData = await response.json();
        handleJokeResponse(jokeData, player, k);
    } catch (error) {
        console.error('Failed to fetch joke:', error);
        displayDialogueWithCharacter(
            'Joke Teller',
            'I am having trouble finding a joke right now.'
        );
    }
};

const handleJokeResponse = (jokeData, player, k) => {
    let jokeText = '';
    if (jokeData.type === 'single') {
        jokeText = jokeData.joke;
    } else if (jokeData.type === 'twopart') {
        jokeText = `${jokeData.setup}\n${jokeData.delivery}`;
    }

    displayDialogueWithCharacter('Joke Teller', jokeText);
};
