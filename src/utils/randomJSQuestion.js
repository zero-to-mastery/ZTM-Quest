export const getRandomQuestion = () => {
    const questions = [
        {
            question: "What is 2 + '2'?",
            options: {
                A: "22",
                B: "4",
                C: "undefined",
                D: "Error",
            },
            answer: 'A',
            explanation: "In JavaScript, adding a number and a string results in string concatenation, so 2 + '2' gives '22'."
        },
        {
            question: "Which type is used for text in JavaScript?",
            options: {
                A: "String",
                B: "Character",
                C: "Float",
                D: "None",
            },
            answer: 'A',
            explanation: "A String is a data type in JavaScript used to represent text."
        },
        {
            question: "What does 'NaN' mean?",
            options: {
                A: "Not a Number",
                B: "Not an Object",
                C: "Number Array",
                D: "None",
            },
            answer: 'A',
            explanation: "'NaN' stands for 'Not a Number', and it represents a value that is not a valid number."
        },
        {
            question: "How do you define a function?",
            options: {
                A: "function = myFunction()",
                B: "function myFunction()",
                C: "create myFunction()",
                D: "None",
            },
            answer: 'B',
            explanation: "The correct syntax to define a function is 'function myFunction()'."
        },
        {
            question: "How to create an array?",
            options: {
                A: "var colors = ['red', 'green']",
                B: "var colors = (1:'red', 2:'green')",
                C: "var colors = 'red', 'green'",
                D: "None",
            },
            answer: 'A',
            explanation: "You create an array in JavaScript using square brackets: var colors = ['red', 'green'];"
        },
        {
            question: "Which keyword is used for variable declaration?",
            options: {
                A: "var",
                B: "let",
                C: "const",
                D: "All",
            },
            answer: 'D',
            explanation: "'var', 'let', and 'const' are all keywords used to declare variables in JavaScript."
        },
        {
            question: "Which method converts a string to a number?",
            options: {
                A: "parseInt()",
                B: "Number()",
                C: "Both A and B",
                D: "None",
            },
            answer: 'C',
            explanation: "Both parseInt() and Number() can convert a string to a number."
        },
        {
            question: "What does JSON stand for?",
            options: {
                A: "JavaScript Object Notation",
                B: "Java Object Notation",
                C: "JavaScript Online Notation",
                D: "None",
            },
            answer: 'A',
            explanation: "JSON stands for 'JavaScript Object Notation', a format for structuring data."
        },
        {
            question: "What is a closure?",
            options: {
                A: "A function inside another function",
                B: "A variable that holds a function",
                C: "An object that holds values",
                D: "None",
            },
            answer: 'A',
            explanation: "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope."
        },
        {
            question: "How to comment in JavaScript?",
            options: {
                A: "// This is a comment",
                B: "<!-- This is a comment -->",
                C: "/* This is a comment */",
                D: "Both A and C",
            },
            answer: 'D',
            explanation: "Both '//' and '/* */' are used for comments in JavaScript."
        },
    ];

    // Select a random question from the array
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
};
