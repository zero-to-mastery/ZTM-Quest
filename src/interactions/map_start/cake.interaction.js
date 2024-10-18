import { speedByScaleFactor } from '../../constants';
import { displayDialogue } from '../../utils';

const cakeDialogue = [
    `
    <div>
        <h2>You ate the whole cake!</h2>
        <p>
            You feel an overwhelming sugar rush!
        </p>
        <p>
            Your heart is racing and you're full of energy!
        </p>
    </div>
`,
];

export const interactionWithCake = (player, k, map) => {
    player.onCollide('cake', () => {
        player.state.speed = speedByScaleFactor * 2.5;
        displayDialogue({
            k,
            player,
            text: cakeDialogue,
        });
    });

    player.onCollideEnd('cake', () => {
        setTimeout(() => {
            player.state.speed = speedByScaleFactor; // Reset to default speed
            displayDialogue({
                k,
                player,
                text: ['SUGAR CRASH'],
            });
        }, 10000);
    });
};
