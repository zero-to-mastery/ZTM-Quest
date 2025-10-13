export const scaleFactor = 2;
export const speedByScaleFactor = 65 * scaleFactor;

// ./assets/sprites/characters.png sprites
export const characters = [
    { name: 'stuart', frames: [0, 4, 2, 8, 1, 6] },
    { name: 'frank', frames: [10, 14, 12, 18, 11, 16] },
    { name: 'junior', frames: [20, 24, 22, 28, 21, 26] },
    { name: 'sarah', frames: [30, 34, 32, 38, 31, 36] },
    { name: 'duke', frames: [40, 44, 42, 48, 41, 46] },
    { name: 'lindsey', frames: [50, 54, 52, 58, 51, 56] },
    { name: 'misterFu', frames: [60, 64, 62, 68, 61, 66] },
    { name: 'jessica', frames: [70, 74, 72, 78, 71, 76] },
    { name: 'jason', frames: [80, 84, 82, 88, 81, 86] },
    { name: 'jacob', frames: [90, 94, 92, 98, 91, 96] },
    { name: 'roger', frames: [150, 154, 152, 158, 151, 156] },
    { name: 'jerry', frames: [160, 164, 162, 168, 161, 166] },
    { name: 'jordan', frames: [170, 174, 172, 178, 171, 176] },
    { name: 'jessie', frames: [180, 184, 182, 188, 181, 186] },
];

// ./assets/sprites/fish.png sprites
export const fishSpriteNames = ['fish_1', 'fish_2', 'fish_3', 'fish_4'];

// ./bruno.png sprite
export const bruno = { name: 'bruno', frames: [0, 3, 2, 7, 1, 5] };

export const conversationBruno = [
    "Hey there! I'm Bruno.",
    "I'm pretty sure you heard already about me.",
    "This time, I won't give you a assignment. At least not yet *hihihihi*.",
    'You will explore the world of ZTM here!',
    'As you already see, we have a lot of people in here who are already interested.',
    'Maybe the one or other will talk to you.',
    "Otherwise if you can't wait to explore the outside world, just go through the door.",
    'As you explore the world, you will lose your energy overtime. Consume drinks/eatables when you are low on energy.',
    'But, make sure you visit the restroom before you go. It will be a long journey.',
];

export const misterFu = { name: 'misterFu', frames: [60, 64, 62, 68, 61, 66] };
export const conversationMisterFu = [
    "Greetings, traveler! I'm MisterFu.",
    "I bet you've heard tales about my adventures.",
    "Today, I won't send you on a quest. Not just yet, anyway wink.",
    "You're about to dive into the world of ZTM and Kaplay!",
    'As you can see, many adventurers are already here, eager to explore.',
    'Some might even share their stories with you.',
    "If you're itching to start your journey, the path lies through that gate.",
    "But don't forget to stock up on supplies before you go. It's a long road ahead.",
];

export const jessie = {
    name: 'jessie',
    frames: [180, 184, 182, 188, 181, 186],
};
export const conversationJessie = [
    [
        'Hey there! Welcome to the arcade! Ready to have some fun?',
        'You can even earn some coins while having fun.',
    ],
    [
        "Hi! I'm Jessie. Need any tips on the best games here?",
        'Few games even gift you some coins when you reach difficult milestone in that game.',
        'Like Chrome Dino Game and Flappy Bird Game.',
    ],
    ["Hello! Have you tried the new racing game? It's awesome!"],
    ["Welcome! I'm Jessie. Let's see if you can beat my high score!"],
    ['Hey! Looking for a challenge? I can show you the toughest games.'],
    ["Hi there! Don't forget to check out the prize counter after playing!"],
    [
        "Hello! Need any help finding a game? I'm your go-to guide!",
        'I can even tell you games that can give you some coins.',
        'Hint: Something to do with numbers. Can you guess it?',
        "Ok. If you didn't get the previous one, I will give you another.",
        'Hint: A crawling machine that picks stuff up.',
    ],
    [
        "Hey! Ready to play? I've got some great game recommendations for you.",
        'Checkout the Chrome Dino Game for some coins.',
    ],
];

export const rico = {
    name: 'Rico',
    frames: [],
};
export const conversationRico = [
    [
        "Welcome to Rico's Arcade — the heartbeat of this town!",
        'Every machine here has a story... and maybe a few hidden coins.',
    ],
    [
        'I’ve been running this place since the first pixel dropped.',
        'Old school, new school — if it’s got a high score, I’ve played it.',
    ],
    [
        'Think you’ve got what it takes to beat the top scores?',
        'Jessie holds the crown on Flappy Bird... but not for long, I hope.',
    ],
    [
        'Win coins. Trade ‘em. Flex ‘em. That’s the arcade way!',
        'Oh, and don’t forget to visit the prize counter. I hand-picked the rewards myself.',
    ],
    [
        'See that dusty cabinet in the back? Legend says no one’s beaten that game in years.',
        'You up for the challenge? Or just here for the candy machine?',
    ],
    [
        'Remember: it’s not just about winning... it’s about style.',
        'So go in there, have fun — and make it epic!',
    ],
];
