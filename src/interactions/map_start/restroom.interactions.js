import { displayDialogue } from '../../utils';

export const restroomInteractions = (player, k, map) => {
    player.onCollide('restroom_toilet', () => {
        player.state.wasInRestroom = true;
        player.state.hasHandsWashed = false;
        const dialogue = ['You feel refreshed now.', 'Ready for the ride.'];

        if (!player.state.hasTalkedToBruno) {
            dialogue.push('You should talk to Bruno first.');
        }
        displayDialogue({
            k,
            player,
            text: [dialogue.join(' ')],
        });
    });

    player.onCollide('restroom_sink', () => {
        displayDialogue({
            k,
            player,
            text: ['You washed your hands. Good job!'],
            onDisplayEnd: () => {
                player.state.hasHandsWashed = true;
            },
        });
    });
};
