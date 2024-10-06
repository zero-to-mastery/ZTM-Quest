import { displayDialogue } from '../../utils';

export const enterMapCityRightInteraction = (player, k, map) => {
    player.onCollide('enter_map_right', () => {
        // Collision point (Enter map boundary) //! NOT THE SPAWNPOINT
        if (
            player.state.hasTalkedToBruno &&
            player.state.wasInRestroom &&
            player.state.hasHandsWashed
        ) {
            import('../../scenes/city').then((_) => {
                k.go('city', 'spawn_office_right'); // City spawn point
            });
        } else {
            if (!player.state.hasTalkedToBruno) {
                player.isInDialog = true;
                displayDialogue({
                    k,
                    player,
                    text: [
                        'You should talk to Bruno first.',
                        'He is the guy with the beautiful suite to your left side.',
                    ],
                    onDisplayEnd: () => {
                        player.isInDialog = false;
                    },
                });

                return;
            } else {
                if (!player.state.wasInRestroom) {
                    player.isInDialog = true;
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'You should visit the restroom first.',
                            'Remember what bruno said? It will be a long journey.',
                            "Don't forget to wash your hands.",
                        ],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                    return;
                }

                if (!player.state.hasHandsWashed) {
                    player.isInDialog = true;
                    displayDialogue({
                        k,
                        player,
                        text: ['You should wash your hands first.'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            }
        }
    });
};
