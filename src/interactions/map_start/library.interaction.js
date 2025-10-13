import { displayDialogue } from '../../utils';

const careerPathDialogue = [
	`
	<div>
        <h2>Zero To Mastery Resources</h2>
        <p>
            Did you know that Zero To Mastery offers a variety of resources to help you on your coding journey?
        </p>
        <p>
            And the best part? Those resources are completely free!
        </p>
        <p>
            Check out <a href="https://zerotomastery.io/blog/" style="color: #007BFF; text-decoration: none;" target='_blank'>ZTM Blog</a>,
            <a href="https://zerotomastery.io/newsletters/" style="color: #007BFF; text-decoration: none;" target='_blank'>ZTM Newsletters</a>, and
            <a href="https://zerotomastery.io/cheatsheets/" style="color: #007BFF; text-decoration: none;" target='_blank'>ZTM Cheat Sheets</a> to enhance your learning!
        </p>
    </div>
`,
];

export const interactionWithLibrary = (player, k, map) => {
	player.onCollide('library', () => {
		displayDialogue({
			k,
			player,
			text: careerPathDialogue,
		});
	});
};
