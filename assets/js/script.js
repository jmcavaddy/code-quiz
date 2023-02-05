var content = document.getElementById('content');
var startBtn = document.getElementById('start-btn');
var highScoreBtn = document.getElementById('high-score-btn');
var timerEl = document.getElementById('timer');

// Questions array
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

// Test high score array 
var highScoresArray = [{
    initials: 'JM',
    score: 100,
}];

// Display Quiz Menu on window load
window.onload = function() {
    displayQuizMenu();
    console.log('window loaded');
}

// Function that displays the quiz menu
function displayQuizMenu () {
    content.innerHTML = '';

    timerEl.textContent = 0;

    var titleEl = document.createElement('h1');
    titleEl.textContent = 'JavaScript Quiz';
    content.appendChild(titleEl);

    var instructionsEl = document.createElement('p');
    instructionsEl.textContent = 'Try to answer the following code-related questions within the time limit.\n Keep in mind that incorrect answers will penalize your score/time by ten seconds!';
    content.appendChild(instructionsEl);

    var startBtn = document.createElement('button');
    startBtn.textContent = 'Start Quiz';
    content.appendChild(startBtn);

    // Event listener for start button
    startBtn.addEventListener('click', function () {
        startQuiz()
    });
}

// Function that displays the high score w/ event listener that goes back to quiz menu
function displayHighScore() {
    console.log('display high score');
    var highScores = document.createElement('h1');
    highScores.textContent = 'High Scores';
    content.appendChild(highScores);

    for (var i = 0; i < highScoresArray.length; i++) {
        var highScore = document.createElement('p');
        highScore.textContent = (i + 1) +". " + highScoresArray[i].initials + ' - ' + highScoresArray[i].score;
        content.appendChild(highScore);
    }

    var goBackBtn = document.createElement('button');
    goBackBtn.textContent = 'Go Back';
    content.appendChild(goBackBtn);

    var clearHighScoreBtn = document.createElement('button');
    clearHighScoreBtn.textContent = 'Clear High Scores';
    content.appendChild(clearHighScoreBtn);

    goBackBtn.addEventListener('click', function() {
        displayQuizMenu();
    })

    clearHighScoreBtn.addEventListener('click', function() {
        highScoresArray = [];
        content.innerHTML = '';
        displayHighScore();
    })
}
// Event listener for high score button
highScoreBtn.addEventListener('click', function() {
    content.innerHTML = '';
    displayHighScore();
});

// Start Quiz
function startQuiz() {
    // Clear content and set timer to 75 seconds
    content.innerHTML = '';
    console.log('start quiz');
    // TODO: Set timer to 75 seconds
    timerEl.textContent = 3;

    // Start timer
    var timerInterval = setInterval(function() {
        timerEl.textContent--;
        if (timerEl.textContent == 0) {
            clearInterval(timerInterval);
            // End Quiz
            endQuiz();
        }
    }, 1000);



//     // Start timer
//     var timerInterval = setInterval(function() {
//         timerEl.textContent--;
//         if (timerEl.textContent == 0) {
//             clearInterval(timerInterval);
//             // End Quiz
//             endQuiz();
//         }
//     }


}

// // Start Quiz
// startBtn.addEventListener('click', function() {
//     // Hide Quiz Menu
//     content.innerHTML = '';
//     // Set timer to 75 seconds
//     timerEl.textContent = 3;
//     // Start timer
//     var timerInterval = setInterval(function() {
//         timerEl.textContent--;
//         if (timerEl.textContent == 0) {
//             clearInterval(timerInterval);
//             // End Quiz
//             endQuiz();
//         }
//     }, 1000);

// });


// End Quiz
function endQuiz() {
    var endQuizTitleEl = document.createElement('h1');
    endQuizTitleEl.textContent = 'All done!';
    content.appendChild(endQuizTitleEl);

    score = timerEl.textContent;

    var endQuizScoreEl = document.createElement('p');
    endQuizScoreEl.textContent = 'Your final score is ' + score;
    content.appendChild(endQuizScoreEl);

    var initialsEl = document.createElement('input');
    initialsEl.setAttribute('type', 'text');
    initialsEl.setAttribute('placeholder', 'Enter initials');
    content.appendChild(initialsEl);

    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    content.appendChild(submitBtn);

    submitBtn.addEventListener('click', function() {
        highScoresArray.push({initials: initialsEl.value, score: endQuizScoreEl.textContent});
        console.log(highScoresArray)
    })

    console.log('end quiz');
    

}