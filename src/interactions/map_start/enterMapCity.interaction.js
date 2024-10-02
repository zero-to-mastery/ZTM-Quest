import { displayDialogueWithoutCharacter } from '../../utils';

export const enterMapCityInteraction = (player, k, map) => {
    player.onCollide('enter_map_right', () => {
        if (
            player.hasTalkedToBruno &&
            player.wasInRestroom &&
            player.hasHandsWashed
        ) {
            import('../../scenes/city').then((_) => {
                k.go('city');
            });
        } else {
            if (!player.hasTalkedToBruno) {
                player.isInDialog = true;
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
                if (!player.wasInRestroom) {
                    player.isInDialog = true;
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

                if (!player.hasHandsWashed) {
                    player.isInDialog = true;
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
