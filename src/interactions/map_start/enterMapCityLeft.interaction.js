import { cityScene } from '../../scenes/city';
import { displayDialogue } from '../../utils';

export const enterMapCityLeftInteraction = (player, k, map) => {
    player.onCollide('enter_map_left', () => {
        if (
            player.state.hasTalkedToBruno &&
            player.state.wasInRestroom &&
            player.state.hasHandsWashed
        ) {
            cityScene({ k, enter_tag: 'spawn_office_left' });
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
