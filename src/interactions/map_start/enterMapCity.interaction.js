import { displayDialogueWithoutCharacter } from '../../utils';
import { stopCharacterAnims } from '../../utils/animation';

export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_right', () => {
        if (
            player.state.hasTalkedToBruno &&
            player.state.wasInRestroom &&
            player.state.hasHandsWashed
        ) {
            import('../../scenes/city').then((_) => {
                k.go('city');
            });
        } else {
            if (!player.state.hasTalkedToBruno) {
                player.isInDialog = true;
                stopCharacterAnims(player);
                displayDialogueWithoutCharacter(
                    [
                        'You should talk to Bruno first.',
                        'He is the guy with the beautiful suite to your left side.',
                    ],
                    () => {
                        player.isInDialog = false;
                    }
                );

                return;
            } else {
                if (!player.state.wasInRestroom) {
                    player.isInDialog = true;
                    stopCharacterAnims(player);
                    displayDialogueWithoutCharacter(
                        [
                            'You should visit the restroom first.',
                            'Remember what bruno said? It will be a long journey.',
                            "Don't forget to wash your hands.",
                        ],
                        () => {
                            player.isInDialog = false;
                        }
                    );
                    return;
                }

                if (!player.state.hasHandsWashed) {
                    player.isInDialog = true;
                    stopCharacterAnims(player);
                    displayDialogueWithoutCharacter(
                        ['You should wash your hands first.'],
                        () => {
                            player.isInDialog = false;
                        }
                    );
                }
            }
        }
    });
};
