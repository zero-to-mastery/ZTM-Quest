import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationJessie, jessie } from '../../constants';

export const interactionWithJessie = (player, k, map) => {
    // Load all Jessie audio files
    // Conversation structure: [conv1: 2 lines, conv2: 3 lines, conv3: 1 line, conv4: 1 line, 
    //                          conv5: 1 line, conv6: 1 line, conv7: 5 lines, conv8: 2 lines]
    const audioFiles = {};
    const conversationLengths = [2, 3, 1, 1, 1, 1, 5, 2]; // Number of lines per conversation
    
    conversationLengths.forEach((lineCount, convIndex) => {
        const convNumber = convIndex + 1; // Files are named conv1, conv2, etc.
        audioFiles[convNumber] = [];
        
        for (let lineIndex = 1; lineIndex <= lineCount; lineIndex++) {
            const audioKey = `jessie_conv${convNumber}_line${lineIndex}`;
            k.loadSound(
                audioKey,
                `./assets/sounds/Jessie_voice/jessie_conv${convNumber}_line${lineIndex}.mp3`
            );
            audioFiles[convNumber].push(audioKey);
        }
    });

    let currentAudio = null;

    const playDialogAudio = (conversationIndex, lineIndex) => {
        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.stop();
        }

        const convNumber = conversationIndex + 1; // Convert 0-based to 1-based
        const audioKey = audioFiles[convNumber][lineIndex];
        
        if (audioKey) {
            currentAudio = k.play(audioKey, {
                volume: 0.7,
            });
        }
    };

    interactionHandler(player, jessie.name, k, () => {
        const selectedConversationIndex = Math.floor(
            Math.random() * conversationJessie.length
        );
        const selectedConversation = conversationJessie[selectedConversationIndex];

        displayDialogue({
            k,
            player,
            characterName: jessie.name,
            text: selectedConversation,
            onDisplayEnd: () => {
                player.state.hasTalkedToJessie = true;
                // Stop audio when dialogue ends
                if (currentAudio) {
                    currentAudio.stop();
                    currentAudio = null;
                }
            },
            onNext: (lineIndex) => {
                // Play audio for the current line in the selected conversation
                playDialogAudio(selectedConversationIndex, lineIndex);
            },
        });
    });
};
