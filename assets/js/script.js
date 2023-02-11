var content = document.querySelector('#content');
var highScoreBtn = document.getElementById('high-score-btn');
var timerEl = document.getElementById('timer');


var questionIndex = 0;
var timer = 0;
var isEndGame = false;

// Questions array; gets called by displayQuestions function
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

// High score array 
var highScoresArray = [];

// Event listener for high score button
highScoreBtn.addEventListener('click', function() {
    // FIXME Is there any reason to clear the content here vs at the top of displayHighScore?
    content.innerHTML = ''; 
    displayHighScore();
});

// Function that displays the quiz menu 
// w/ event listener that starts the quiz
function displayQuizMenu () {
    var startBtn = document.getElementById('start-btn');

    content.innerHTML = '';
    isEndGame = true;

    // Set timer to 75 seconds
    timer = 75;
    timerEl.textContent = timer;

    var titleEl = document.createElement('h1');
    titleEl.textContent = 'JavaScript Quiz';
    content.appendChild(titleEl);

    var instructionsEl = document.createElement('p');
    instructionsEl.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!';
    content.appendChild(instructionsEl);

    var startBtn = document.createElement('button');
    startBtn.textContent = 'Start Quiz';
    content.appendChild(startBtn);

    // Event listener for start button
    startBtn.addEventListener('click', function() {startQuiz()});
}



// Function that displays the high score 
// w/ event listener that goes back to quiz menu
function displayHighScore() {

    isEndGame = true;
    // clearInterval(timerInterval);

    console.log('display high score');
    var highScores = document.createElement('h1');
    highScores.textContent = 'High Scores';
    content.appendChild(highScores);
    
    // Sort high scores array by score
    highScoresArray.sort((a, b) => {return b.score - a.score});
    
    // Display high score leaderboard
    for (var i = 0; i < highScoresArray.length; i++) {
        var highScore = document.createElement('p');
        highScore.textContent = (i + 1) +". " + highScoresArray[i].initials + ' - ' + highScoresArray[i].score;
        content.appendChild(highScore);
    }

    // Create and style go back button
    var goBackBtn = document.createElement('button');
    goBackBtn.textContent = 'Go Back';
    goBackBtn.setAttribute("style", "margin-bottom: 10px; background-color:plum; border-radius: 5px; ")
    content.appendChild(goBackBtn);

    // Event listener to go back to quiz menu from high scores
    goBackBtn.addEventListener('click', function() {
        displayQuizMenu();
    })

    var clearHighScoreBtn = document.createElement('button');
    clearHighScoreBtn.textContent = 'Clear High Scores';
    clearHighScoreBtn.setAttribute("style", "background-color:red; border-radius: 5px ")
    content.appendChild(clearHighScoreBtn);

    // Event listener to clear high scores list
    clearHighScoreBtn.addEventListener('click', function() {
        highScoresArray = [];
        content.innerHTML = '';
        displayHighScore();
    })
}

// Start Quiz
function startQuiz() {
    // Clear content and set timer to 75 seconds
    content.innerHTML = '';
    timer = 75;
    timerEl.textContent = timer;
    isEndGame = false;

    // Call function that handles displaying questions
    displayQuestions();

    // Start timer, decrement timer by 1 every second, and end quiz when timer reaches 0
    var timerInterval = setInterval(function() {
        console.log("timer started")
        
        if (timer <= 0 || questionIndex === questions.length) {
            clearInterval(timerInterval);
            // End Quiz
            endQuiz();
        } else if (isEndGame) {
            clearInterval(timerInterval);
        }
        if (!isEndGame) {
            timer--; 
            timerEl.textContent = timer;
        }
        
    }, 1000);
    
}

// Display Questions
function displayQuestions() {
        // Creates question as a h1 element and appends to content
        var questionEl = document.createElement('h1');
        questionEl.textContent = questions[questionIndex].question;
        content.appendChild(questionEl);

        // Displays choices for each question
        for (var i = 0; i < questions[questionIndex].choices.length; i++) {
            var choicesEl = document.createElement('button');
            choicesEl.textContent = questions[questionIndex].choices[i];
            choicesEl.setAttribute("style", "margin-bottom: 10px; background-color:purple; border-radius: 5px; color: white;")
            content.appendChild(choicesEl);

            // Event listener for choices
            choicesEl.addEventListener('click', function() {
                // Calls checkAnswer function with text content of button clicked
                checkAnswer(this.textContent);
            })
        }
};

// Check Answer
function checkAnswer(choice) {
    console.log(choice);
    if (choice === questions[questionIndex].answer) {
        console.log('correct');
        questionIndex++;
        content.innerHTML = '';
        (questionIndex == questions.length) ? endQuiz() : displayQuestions();
    } else {
        console.log('wrong');
        timer -= 10;        
        questionIndex++;
        content.innerHTML = '';
        (questionIndex == questions.length) ? endQuiz() : displayQuestions();
    }
}

// End Quiz
function endQuiz() {
    isEndGame = true;

    content.innerHTML = '';

    score = timer;
    timerEl.textContent = score;

    var endQuizTitleEl = document.createElement('h1');
    endQuizTitleEl.textContent = 'All done!';
    content.appendChild(endQuizTitleEl);

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
        highScoresArray.push({initials: initialsEl.value, score: score});
        console.log(highScoresArray)
        content.innerHTML = '';
        questionIndex = 0;
        displayHighScore();
    })

    console.log('end quiz');
    

}

// Calling the function that displays the quiz menu on page load

displayQuizMenu();
