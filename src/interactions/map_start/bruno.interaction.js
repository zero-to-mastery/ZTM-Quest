import { interactionHandler } from '../handler.interactions';
import { displayDialogue } from '../../utils';
import { conversationBruno, bruno } from '../../constants';
import {
    completeQuestObjective,
    completeQuest,
    playerHasQuest,
    recieveQuest,
} from '../../utils/questHandler';
import { map_start_quests } from '../quests/constants.quests';

export const interactionWithBruno = (player, k, map) => {
    // Load Bruno voice audio files
    for (let i = 0; i < 9; i++) {
        const soundKey = `bruno_voice_${i}`;
        if (!k.getSound(soundKey)) {
            k.loadSound(soundKey, `./assets/sounds/Bruno_voice/Bruno[${i}].mp3`);
        }
    }

    interactionHandler(player, bruno.name, k, () => {
        let currentAudio = null;

        // Function to play audio for current dialog
        const playDialogAudio = (index) => {
            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.stop();
            }

            // Play the audio for this dialog line
            const soundKey = `bruno_voice_${index}`;
            if (k.getSound(soundKey)) {
                currentAudio = k.play(soundKey, {
                    volume: 0.7,
                });
            }
        };

        displayDialogue({
            k,
            player,
            characterName: bruno.name,
            text: conversationBruno,
            onDisplayEnd: async () => {
                // Stop audio when dialog ends
                if (currentAudio) {
                    currentAudio.stop();
                }
                
                if (!playerHasQuest(player, 'Start Interacting!')) {
                    await recieveQuest(
                        player,
                        map_start_quests['Start Interacting!']
                    );
                }
                await completeQuestObjective(
                    player,
                    'Start Interacting!',
                    'hasTalkedToBruno'
                );
                // Internally checks if all objectives are complete
                await completeQuest(player, 'Start Interacting!');
            },
            onNext: (index) => {
                playDialogAudio(index);
            },
        });
    });
};
