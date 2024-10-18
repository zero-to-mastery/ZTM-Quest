import { displayDialogue } from '../../utils';

export const enterMapCityRightInteraction = (player, k, map) => {
    player.onCollide('enter_map_right', () => {
        // Collision point (Enter map boundary) //! NOT THE SPAWNPOINT
        if (
            player.state.hasTalkedToBruno &&
            player.state.wasInRestroom &&
            player.state.hasHandsWashed
        ) {
            k.go('city', 'spawn_office_right'); // City spawn point
        } else {
            if (!player.state.hasTalkedToBruno) {
                displayDialogue({
                    k,
                    player,
                    text: [
                        'You should talk to Bruno first.',
                        'He is the guy with the beautiful suite to your left side.',
                    ],
                });

                return;
            } else {
                if (!player.state.wasInRestroom) {
                    displayDialogue({
                        k,
                        player,
                        text: [
                            'You should visit the restroom first.',
                            'Remember what bruno said? It will be a long journey.',
                            "Don't forget to wash your hands.",
                        ],
                    });
                    return;
                }

                if (!player.state.hasHandsWashed) {
                    displayDialogue({
                        k,
                        player,
                        text: ['You should wash your hands first.'],
                    });
                }
            }
        }
    });
};
