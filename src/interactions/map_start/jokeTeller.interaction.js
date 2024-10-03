import { displayDialogue } from '../../utils';
import { npcInteractionHandler } from '../handler.interactions';

export const interactionWithJokeTeller = (player, k, map) => {
    npcInteractionHandler(player, 'jokeTellerNpc', k, async () => {
        player.isInDialogue = true;
        try {
            const response = await fetch(
                'https://v2.jokeapi.dev/joke/Any?safe-mode'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { setup, joke, delivery } = await response.json();
            displayDialogue({
                k,
                player,
                characterName: 'Joke Teller',
                text: [setup, joke, delivery].filter(Boolean),
                onDisplayEnd: () => {
                    player.isInDialogue = false;
                },
            });
        } catch (error) {
            console.error('Failed to fetch joke:', error);
            displayDialogue({
                k,
                player,
                characterName: 'Joke Teller',
                text: ['I am having trouble finding a joke right now.'],
                onDisplayEnd: () => {
                    player.isInDialogue = false;
                },
            });
        }
    });
};
