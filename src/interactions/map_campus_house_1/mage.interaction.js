import { displayDialogue, displayPermissionBox } from '../../utils';
import { updateEnergyState } from '../../utils/energyUpdate';

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

export const mageInteractions = async (player, k, map) => {
    const [computer] = map.query({ include: 'computer' });
    let mageInteractionCounter = 0;
    player.state.alreadyTalkedToMage = false;

    //TODO: You can add some prize for the player if they solve the challenge and get back to the mage
    player.onCollide('mage', async () => {
        computer.play('on');

        if (!player.state.alreadyTalkedToMage) {
            mageInteractionCounter++;

            if (mageInteractionCounter === 1) {
                player.isInDialog = true;
                await displayDialogue({
                    k,
                    player,
                    text: firstText,
                    characterName: 'Mage',
                    onDisplayEnd: () => {
                        player.isInDialog = false;
                    },
                });
            }

            if (mageInteractionCounter >= 2) {
                player.isInDialog = true;

                let tryChallenge = await displayPermissionBox({
                    k,
                    player,
                    text: questionText,
                    onDisplayEnd: () => {
                        player.isInDialog = false;
                    },
                });

                if (tryChallenge) {
                    player.isInDialog = true;
                    await displayDialogue({
                        k,
                        player,
                        text: spell,
                        characterName: 'Mage',
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });

                    //TODO: You can add a flickering effect to the dialog box to make it more magical

                    player.state.alreadyTalkedToMage = true;
                } else {
                    player.isInDialog = true;
                    await displayDialogue({
                        k,
                        player,
                        text: noSpell,
                        characterName: 'Mage',
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            }
        } else {
            computer.play('on');

            if (player?.state?.hasButterBeer) {
                // Mage asks if he can have the butterbeer
                let giveButterBeer = await displayPermissionBox({
                    k,
                    player,
                    text: butterBeerDialog.ask,
                    characterName: 'Mage',
                    onDisplayEnd: () => {
                        player.isInDialog = false;
                    },
                });

                if (giveButterBeer) {
                    player.isInDialog = true;
                    await displayDialogue({
                        k,
                        player,
                        text: butterBeerDialog.thank,
                        characterName: 'Mage',
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                            player.state.hasButterBeer = false;
                            updateEnergyState(player.state, 99);
                        },
                    });
                } else {
                    player.isInDialog = true;
                    await displayDialogue({
                        k,
                        player,
                        text: butterBeerDialog.denied,
                        characterName: 'Mage',
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            } else {
                player.isInDialog = true;
                await displayDialogue({
                    k,
                    player,
                    text: alredyUnlockText,
                    onDisplayEnd: () => {
                        player.isInDialog = false;
                    },
                });
            }
        }
    });

    player.onCollideEnd('mage', () => {
        computer.play('off');
    });
};
