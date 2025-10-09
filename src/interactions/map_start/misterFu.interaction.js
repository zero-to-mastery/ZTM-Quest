import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

import { conversationMisterFu, misterFu } from '../../constants';

export const interactionWithMisterFu = (player, k, map) => {
    // Load MisterFu voice audio files
    for (let i = 0; i < 8; i++) {
        const soundKey = `misterFu_voice_${i}`;
        if (!k.getSound(soundKey)) {
            k.loadSound(soundKey, `./assets/sounds/misterFU_voice/MisterFu[${i}].mp3`);
        }
    }

    interactionHandler(player, misterFu.name, k, () => {
        let currentAudio = null;

        // Function to play audio for current dialog
        const playDialogAudio = (index) => {
            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.stop();
            }

            // Play the audio for this dialog line
            const soundKey = `misterFu_voice_${index}`;
            if (k.getSound(soundKey)) {
                currentAudio = k.play(soundKey, {
                    volume: 0.7,
                });
            }
        };

        displayDialogue({
            k,
            player,
            characterName: misterFu.name,
            text: conversationMisterFu,
            onDisplayEnd: () => {
                player.state.hasTalkedToMisterFu = true;
                // Stop audio when dialog ends
                if (currentAudio) {
                    currentAudio.stop();
                }
            },
            onNext: (index) => {
                playDialogAudio(index);
            },
        });
    });
};
