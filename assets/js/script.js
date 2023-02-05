// Selecting elements from HTML by ID
var startEl = document.getElementById("start");
var highscoreEl = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");

// FIXME: Set timer to 75 seconds
var timer = 3;
var score = 0;

// Array of questions
var questions = [{
    question: "Common data types in JavaScript DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
},
{
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Parentheses",
},
{
    question: "Arrays in JavaScript can be used to store ____.",
    choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    answer: "All of the above",
},
{
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes",
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal / Bash", "For loops", "Console.log"],
    answer: "Console.log",
}
];

// Event listener for start button
startEl.addEventListener("click", function () {
    // Set timerEl to timer when start button is clicked
    timerEl.textContent = timer;
    // Hide quizMenuEl when start button is clicked
    quizEl.innerHTML = "";
    // Call startGame function when start button is clicked
    startGame();

    
});

// Start game function
function startGame() {
    quizFunction();
    // Decrement timer by 1 every second
    setInterval(function () {
        timerEl.textContent--;

        // If timer is 0, end game
        if (timerEl.textContent == 0) {
            clearInterval(timerEl.textContent);
            endGame();
        }
    }, 1000);

    // Loop through questions array


}

// Quiz function
function quizFunction() {
    // Append question to quiz
    // Create h1 element named questionEl
    var questionEl = document.createElement("h1");
    // Set questionEl text content to first question in questions array
    questionEl.textContent = questions[0].question;
    // Append questionEl to quizEl
    quizEl.appendChild(questionEl);

    // Append choices to quiz
    // Create ul element named choicesEl
    var choiceEl = document.createElement("ul");
    for (var i = 0; i < questions[0].choices.length; i++) {
        console.log(questions[0].choices[i])
        // Create li element named choiceEl
        var choiceEl = document.createElement("button");

        // Set choiceEl text content to first choice in questions array
        choiceEl.textContent = questions[0].choices[i];
        // Append choiceEl to choicesEl
        quizEl.appendChild(choiceEl);
    }
}

// End game function
function endGame() {
    timerEl.textContent = 0;
}