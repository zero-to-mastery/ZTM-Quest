import { displayDialogue } from '../../utils';

const careerPathDialogue = [
    `
    <div>
        <h2>Zero To Mastery Career Paths</h2>
        <p>
            Whether you’re a complete beginner or an experienced professional, figuring out the
            next step in your career can be overwhelming.
        </p>
        <p>
            Our curated Career Paths provide you with the step-by-step roadmap you need to take you from any level, to getting hired
            and advancing your career.
        </p>
        <p>
            <a href="https://zerotomastery.io/career-paths/" style="color: #007BFF; text-decoration: none;" target='_blank'>Pick a Career Path here</a> and start your journey.
        </p>
    </div>
`,
];

export const interactionWithComputer = (player, k, map) => {
    const [computer] = k.query({ include: 'computer' });

    player.onCollide('computer', () => {
        player.isInDialog = true;
        computer.play('on');
        displayDialogue({
            k,
            player,
            text: careerPathDialogue,
            onDisplayEnd: () => {
                player.isInDialog = false;
            },
        });
    });

    player.onCollideEnd('computer', () => {
        computer.play('off');
    });
};
