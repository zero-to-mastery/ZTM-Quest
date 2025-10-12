import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';
import { addCoins } from '../../utils/coinsUpdate';
import { createCelebrationEffect } from '../../utils/questHandler';

const alredyUnlockText = ['The challenge is waiting for you!'];

const firstText = [
    'You shall not pass! Bruruuuuu!',
    'Hehe, you’ve found me, just as I was practicing my lines!',
    'Cof cof… the dust of ancient tomes, no doubt!',
    'I am the Mage of the House, keeper of secrets, and I hold a special challenge within the depths of this computer!',
    'I can unlock the computer for thee, but beware—thou shalt have but one chance to find the right answer!',
];

const questionText = [
    'Do you dare to try thy hand at this most perilous trial?',
];

const spell = [
    'By the stars above, and the code beneath, unlock this mystery, to test their wit and feat!',
    'The computer suddenly glows with a bright light, and the screen changes to show a challenge.',
];

const noSpell = [
    'It does not seem like thou art yet prepared for the challenge...',
];

const butterBeerDialog = {
    ask: [
        "Hey, is that a butterbeer you're carrying? That's my favorite drink! If you're not going to drink it, may I have it?",
    ],
    thank: [
        'Thank you so much! "Since this dev has been so great, his energy is now top rate!"',
    ],
    denied: ['Oh, ok. I understand...'],
};

const challengeRewardDialog = [
    'Ah, thou hast returned! I sense the magic of success upon thee!',
    'Thou hast conquered the challenge with great skill and wisdom!',
    'As promised, accept this reward for thy triumph - 15 golden coins!',
    'May they serve thee well on thy journey through the realm of ZTM!',
];

export const mageInteractions = async (player, k, map) => {
    const [computer] = map.query({ include: 'computer' });
    let mageInteractionCounter = 0;

    player.onCollide('mage', async () => {
        computer.play('on');

        if (!player.state.alreadyTalkedToMage) {
            mageInteractionCounter++;

            if (mageInteractionCounter === 1) {
                await displayDialogue({
                    k,
                    player,
                    text: firstText,
                    characterName: 'Mage',
                });
            }

            if (mageInteractionCounter >= 2) {
                let tryChallenge = await displayPermissionBox({
                    k,
                    player,
                    text: questionText,
                });

                if (tryChallenge) {
                    await displayDialogue({
                        k,
                        player,
                        text: spell,
                        characterName: 'Mage',
                        addFlickerEffect: true,
                    });

                    player.state.alreadyTalkedToMage = true;
                } else {
                    await displayDialogue({
                        k,
                        player,
                        text: noSpell,
                        characterName: 'Mage',
                    });
                }
            }
        } else {
            computer.play('on');

            // Check if player completed the challenge and hasn't received reward yet
            if (
                player?.state?.completedMageChallenge &&
                !player?.state?.receivedMageReward
            ) {
                // Add coins and update state BEFORE showing dialog
                addCoins(15);
                player.state.receivedMageReward = true;
                player.state.completedMageChallenge = false;

                createCelebrationEffect();
                await displayDialogue({
                    k,
                    player,
                    text: challengeRewardDialog,
                    characterName: 'Mage',
                });
            } else if (player?.state?.receivedMageReward) {
                // Player has already completed and received reward once
                // They can try again but won't get more coins
                await displayDialogue({
                    k,
                    player,
                    text: [
                        'Thou hast already proven thy worth and claimed thy reward!',
                        'The challenge remains for thee to test thy skills, but I have no more coins to offer.',
                    ],
                    characterName: 'Mage',
                });
            } else if (player?.state?.hasButterBeer) {
                // Mage asks if he can have the butterbeer
                let giveButterBeer = await displayPermissionBox({
                    k,
                    player,
                    text: butterBeerDialog.ask,
                    characterName: 'Mage',
                });

                if (giveButterBeer) {
                    await displayDialogue({
                        k,
                        player,
                        text: butterBeerDialog.thank,
                        characterName: 'Mage',
                        onDisplayEnd: () => {
                            player.state.hasButterBeer = false;
                            updateEnergyState(player.state, 99);
                        },
                    });
                } else {
                    await displayDialogue({
                        k,
                        player,
                        text: butterBeerDialog.denied,
                        characterName: 'Mage',
                    });
                }
            } else {
                await displayDialogue({
                    k,
                    player,
                    text: alredyUnlockText,
                });
            }
        }
    });

    player.onCollideEnd('mage', () => {
        computer.play('off');
    });
};
