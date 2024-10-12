export const getRandomCodingJoke = () => {
    const storyJokes = [
        "A programmer was driving down the road and saw a sign that said 'Left Lane Closed.' He drove in the right lane instead and yelled, 'Why can’t I go left? The road is closed, not the lane!'",
        "Two developers were talking about their work. One said, 'I have a problem with my code; it keeps crashing.' The other replied, 'Have you tried turning it off and on again?' The first one laughed and said, 'I’m not that desperate yet!'",
        "Once, a programmer got locked out of his house. He thought, 'I'll just change the door's state to 'open.' It didn't work, but at least I learned something about state management!",
        "A Python programmer and a Java programmer went camping. The Python programmer built a tent in a few minutes, while the Java programmer took hours to compile his tent. When the storm hit, the Python programmer stayed dry while the Java programmer debugged his tent!",
        "A developer walks into a bar and orders a drink. The bartender says, 'Sorry, we don't serve your kind here.' The developer replies, 'That's okay; I’m just here for the exceptions!'",
        "At a coding bootcamp, a student asked the instructor, 'What’s the best way to learn how to code?' The instructor smiled and said, 'Start by learning to write errors. You’ll get really good at fixing them!'",
        "A junior developer asked a senior developer, 'What’s the secret to writing good code?' The senior developer replied, 'Always keep your code clean and readable.' The junior developer replied, 'Well, that explains why my code is always messy; I forget to clean it!'",
        "Once, a web developer tried to build a bridge. When asked why, he said, 'I wanted to see if I could get across with just a few lines of code!'",
        "A programmer was on a date when his phone started buzzing. He said, 'Sorry, I have to check my notifications.' His date replied, 'Is that really necessary?' The programmer said, 'Of course! I can't let any exceptions go unhandled!'",
    ];

    const randomJoke =
        storyJokes[Math.floor(Math.random() * storyJokes.length)];

    return randomJoke;
};
