import { displayDialogue } from '../../utils';
import { interactionHandler } from '../handler.interactions';

export const interactionWithJokeTeller = (player, k, map) => {
    interactionHandler(player, 'jokeTellerNpc', k, async () => {
        try {
            const response = await fetch(
                'https://v2.jokeapi.dev/joke/Any?safe-mode'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { setup, joke, delivery } = await response.json();
            const jokeText = [setup, joke, delivery].filter(Boolean);
            
            // Text-to-Speech setup
            let currentSpeech = null;
            
            const speakText = (text) => {
                // Stop any currently playing speech
                if (currentSpeech) {
                    window.speechSynthesis.cancel();
                }
                
                // Check if browser supports speech synthesis
                if ('speechSynthesis' in window) {
                    currentSpeech = new SpeechSynthesisUtterance(text);
                    currentSpeech.rate = 1.0; // Normal speed
                    currentSpeech.pitch = 1.0; // Normal pitch
                    currentSpeech.volume = 0.7; // 70% volume
                    
                    // Try to find a male English voice
                    const voices = window.speechSynthesis.getVoices();
                    
                    // Priority: Male English voice
                    const maleEnglishVoice = voices.find(voice => 
                        voice.lang.startsWith('en') && 
                        (voice.name.toLowerCase().includes('male') || 
                         voice.name.toLowerCase().includes('man') ||
                         voice.name.toLowerCase().includes('david') ||
                         voice.name.toLowerCase().includes('james') ||
                         voice.name.toLowerCase().includes('daniel'))
                    );
                    
                    // Fallback: Any English voice
                    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                    
                    if (maleEnglishVoice) {
                        currentSpeech.voice = maleEnglishVoice;
                    } else if (englishVoice) {
                        currentSpeech.voice = englishVoice;
                    }
                    
                    window.speechSynthesis.speak(currentSpeech);
                }
            };
            
            displayDialogue({
                k,
                player,
                characterName: 'Joke Teller',
                text: jokeText,
                onDisplayEnd: () => {
                    // Stop speech when dialog ends
                    if (window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                    }
                },
                onNext: (index) => {
                    // Speak the current joke line
                    if (jokeText[index]) {
                        speakText(jokeText[index]);
                    }
                },
            });
        } catch (error) {
            k.debug.error('Failed to fetch joke:', error);
            
            const errorText = ['I am having trouble finding a joke right now.'];
            
            // Text-to-Speech for error message
            const speakText = (text) => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const speech = new SpeechSynthesisUtterance(text);
                    speech.rate = 1.0;
                    speech.pitch = 1.0;
                    speech.volume = 0.7;
                    
                    // Try to find a male English voice
                    const voices = window.speechSynthesis.getVoices();
                    const maleEnglishVoice = voices.find(voice => 
                        voice.lang.startsWith('en') && 
                        (voice.name.toLowerCase().includes('male') || 
                         voice.name.toLowerCase().includes('man') ||
                         voice.name.toLowerCase().includes('david') ||
                         voice.name.toLowerCase().includes('james') ||
                         voice.name.toLowerCase().includes('daniel'))
                    );
                    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                    
                    if (maleEnglishVoice) {
                        speech.voice = maleEnglishVoice;
                    } else if (englishVoice) {
                        speech.voice = englishVoice;
                    }
                    
                    window.speechSynthesis.speak(speech);
                }
            };
            
            displayDialogue({
                k,
                player,
                characterName: 'Joke Teller',
                text: errorText,
                onDisplayEnd: () => {
                    if (window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                    }
                },
                onNext: (index) => {
                    if (errorText[index]) {
                        speakText(errorText[index]);
                    }
                },
            });
        }
    });
};
