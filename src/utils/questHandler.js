import { displayDialogue } from '../utils.js';
import { k } from '../kplayCtx.js';

// Create celebration effect with confetti/stars
const createCelebrationEffect = () => {
    const celebrationContainer = document.createElement('div');
    celebrationContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 10000;
        overflow: hidden;
    `;
    document.body.appendChild(celebrationContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const isConfetti = Math.random() > 0.5;
        
        if (isConfetti) {
            // Confetti piece
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                left: ${Math.random() * 100}%;
                top: -20px;
                transform: rotate(${Math.random() * 360}deg);
            `;
        } else {
            // Star particle
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: absolute;
                font-size: ${12 + Math.random() * 8}px;
                animation: star-twinkle ${1.5 + Math.random() * 2}s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                color: gold;
            `;
        }
        
        celebrationContainer.appendChild(particle);
    }

    // Add animation keyframes if they don't exist
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            @keyframes star-twinkle {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Clean up after animation
    setTimeout(() => {
        if (celebrationContainer.parentNode) {
            celebrationContainer.parentNode.removeChild(celebrationContainer);
        }
    }, 5000);
};

export const completeQuest = async (player, questName) => {
    if (playerHasQuest(player, questName)) {
        if (player.state.quests[questName].done) {
            return;
        }

        const { objectives } = player.state.quests[questName];
        // New object to contain quest properties
        const newObj = {};
        let hasFoundIncompleteObjective = false;
        // If there is an objective that is not finished then show dialog to user
        for (let objective in objectives) {
            if (!objectives[objective]) {
                await displayDialogue({
                    k,
                    player,
                    characterName: "Quest System",
                    text: [`You have not finished: "${objective}"`],
                });
                hasFoundIncompleteObjective = true;
            }
        }

        if (hasFoundIncompleteObjective) {
            return;
        }

        // Triggers set handler in Proxy state object
        newObj[questName] = { ...player.state.quests[questName], done: true };
        player.state.quests = { ...player.state.quests, ...newObj };
        createCelebrationEffect();
        await displayDialogue({
            k,
            player,
            characterName: "Quest System",
            text: [`🎉 Quest Completed! 🎉`, `"${questName}"`],
        });
    }
};

export const completeQuestObjective = async (player, questName, objective) => {
    // If player does not have quest or objective
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }

    if (player.state.quests[questName].objectives[objective]) {
        return;
    }

    // Sets objective to true status
    player.state.quests[questName].objectives[objective] = true;
    // Triggers set handler in Proxy state object
    player.state.quests = { ...player.state.quests };
    createCelebrationEffect();
    await displayDialogue({
        k,
        player,
        characterName: "Quest System",
        text: [`✅ Objective Completed!`, `"${objective}"`],
    });
};

export const retrieveQuestObjectiveStatus = (player, questName, objective) => {
    // If player does not have quest or objective
    if (
        !playerHasQuest(player, questName) ||
        !playerHasObjective(player, questName, objective)
    ) {
        return;
    }

    // Returns objective status
    return player.state.quests[questName].objectives[objective];
};

export const recieveQuest = async (player, quest) => {
    if (!playerHasQuest(player, Object.keys(quest)[0])) {
        // Triggers set handler in Proxy state object
        player.state.quests = { ...player.state.quests, ...quest };
        createCelebrationEffect();
        await displayDialogue({
            k,
            player,
            characterName: "Quest System",
            text: [`🆕 New Quest Started!`, `"${Object.keys(quest)[0]}"`],
        });
    }
};

export const playerHasQuest = (player, questName) => {
    return questName in player.state.quests;
};

const playerHasObjective = (player, questName, objective) => {
    return objective in player.state.quests[questName].objectives;
};

// If you want to add quests, you can recieve them through interactions.
// Use recieveQuest to get the quest via the player's state object.
