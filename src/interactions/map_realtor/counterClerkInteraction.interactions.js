import { interactionHandler } from '../handler.interactions';
import { displayDialogue, displayPermissionBox } from '../../utils';
import {
    completeQuest,
    completeQuestObjective,
    recieveQuest,
} from '../../utils/questHandler';
import { takeAwayCoins } from '../../utils/coinsUpdate';
import { map_realtor } from '../quests/constants.quests';

export const counterClerkInteraction = (player, k) => {
    interactionHandler(player, 'counter_clerk', k, async () => {
        await displayDialogue({
            k,
            player,
            characterName: 'Realtor Clerk',
            text: [
                'Hello, we are a firm that gives out houses to residents attending Zero To Mastery.',
                'Would you like to purchase a house?',
            ],
        });
        recieveQuest(player, map_realtor['Buy a house!']);
        completeQuestObjective(
            player,
            'Buy a house!',
            'hasTalkedToRealtorClerk'
        );
        const answer = await displayPermissionBox({ k, player, text: [''] });
        if (answer) {
            const possibleHouses = ['Orange House', 'Red House'];
            const choices = [
                ...possibleHouses.filter(
                    (el) => !player.state.housesOwned.includes(el.split(' ')[0])
                ),
                "Neither, I've changed my mind",
            ];
            showCustomPrompt(
                'Which house would you like to buy?',
                choices,
                (selectedOption) => {
                    const selectedOptionArr = selectedOption.split(' ');
                    if (!selectedOptionArr.includes('House')) {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                "Okay, well let me know if you change your mind and we'll see if we can set you up!",
                            ],
                        });
                        return;
                    }
                    if (player.state.coinsCollected >= 100) {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                'Congratulations!',
                                `You now own the ${selectedOption}!`,
                            ],
                            onDisplayEnd: () => {
                                player.state.housesOwned = [
                                    ...player.state.housesOwned,
                                    selectedOptionArr[0],
                                ];
                                takeAwayCoins(100);

                                completeQuestObjective(
                                    player,
                                    'Buy a house!',
                                    'hasBoughtHouse'
                                );
                                completeQuest(player, 'Buy a house!');
                            },
                        });
                    } else {
                        displayDialogue({
                            k,
                            player,
                            characterName: 'Realtor Clerk',
                            text: [
                                "Oooooof, I'm sorry.",
                                "It looks like you don't have enough coins for the house...",
                            ],
                        });
                    }
                }
            );
        } else {
            await displayDialogue({
                k,
                player,
                characterName: 'Realtor Clerk',
                text: [
                    "Okay, well let me know if you change your mind and we'll see if we can set you up!",
                ],
            });
        }
    });
};

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
                // Enter or Space key
                e.preventDefault(); // Prevent the default behavior (e.g., form submission)
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

// Function to close the custom prompt
function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}
