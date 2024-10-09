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
    player.onCollide('cake', (table) => {
        player.isInDialog = true;
        player.speed = 500;
        displayDialogue({
            k,
            player,
            text: cakeDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });

    player.onCollideEnd('cake', (table) => {
        setTimeout(() => {
            player.isInDialog = true;
            player.speed = speedByScaleFactor; // Reset to default speed
            displayDialogue({
                k,
                player,
                text: ['SUGAR CRASH'],
                onDisplayEnd: () => {
                    player.isInDialog = false;
                },
            });
        }, 10000);
    });
};
