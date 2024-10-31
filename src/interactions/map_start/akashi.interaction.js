import { speedByScaleFactor } from '../../constants';
import { displayDialogue } from '../../utils';

const akashiDialogue = [
    `
    <div>
        <h2>Welcome to ZTM Hacktoberfest!</h2>
        <p>
            You've arrived at the perfect place to start contributing to open-source projects.
        </p>
        <p>
            Hacktoberfest is a month-long celebration of open-source, and it's a great chance to sharpen your skills, connect with other developers, and make a real impact.
        </p>
        <p>
            Let's get coding and make some meaningful contributions together!
        </p>
    </div>
`,
];

export const interactionWithAkashi = (player, k, map) => {
    player.onCollide('akashi', () => {
        player.state.speed = speedByScaleFactor * 2.5;
        displayDialogue({
            k,
            player,
            text: akashiDialogue,
        });
    });

    player.onCollideEnd('akashi', () => {
        setTimeout(() => {
            player.state.speed = speedByScaleFactor;
            displayDialogue({
                k,
                player,
                text: ['Meeting elders'],
            });
        }, 10000);
    });
};
