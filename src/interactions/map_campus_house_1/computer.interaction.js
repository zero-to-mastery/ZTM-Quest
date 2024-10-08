import { displayDialogue } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

const challengeText = `What's the value of output?:
<pre style="font-size: 14px;"><code>const one = false || {} || null;
const two = null || false || '';
const three = [] || 0 || true;
console.log(one, two, three);</code></pre>`;

const options = [
    {
        value: 'A',
        text: `<pre style="font-size: 14px;"><code>false null []</code></pre>`,
    },
    {
        value: 'B',
        text: `<pre style="font-size: 14px;"><code>null "" true</code></pre>`,
    },
    {
        value: 'C',
        text: `<pre style="font-size: 14px;"><code>{} "" []</code></pre>`,
    },
    {
        value: 'D',
        text: `<pre style="font-size: 14px;"><code>null null true</code></pre>`,
    },
];

export const computerInteractions = async (player, k, map) => {
    player.onCollide('computer', async () => {
        const energyUI = document.getElementById('energy-container');
        energyUI.style.display = 'none';
        const [computer] = k.query({ include: 'computer' });
        computer.play('on');
        player.isInDialog = true;

        showCustomPrompt(challengeText, options, async (selectedOption) => {
            const response = [];

            if (selectedOption == 'C') {
                updateEnergyState(player.state, -10);
                response.push("Correct!, you're a genius!");
                response.push('It was a tough one!, You look tired');
            } else {
                updateEnergyState(player.state, -30);
                response.push('Incorrect! Try again next time!');
                response.push('Anyway it was a good effort, You look tired');
            }

            response.push(
                'You should take a nap before you continue exploring the campus'
            );

            await displayDialogue({
                k,
                player,
                text: response,
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });
        });
    });

    player.onCollideEnd('computer', () => {
        const energyUI = document.getElementById('energy-container');
        energyUI.style.display = 'flex';
        const [computer] = k.query({ include: 'computer' });
        computer.play('off');
    });
};

function showCustomPrompt(message, options, callback) {
    // Set the prompt message
    const energyUI = document.getElementById('energy-container');
    energyUI.style.display = 'none';

    let promotMessage = document.getElementById('prompt-message');
    promotMessage.innerHTML = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        button.innerHTML = option.text;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            callback(option.value);
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
