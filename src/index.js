var currentQuestion;
var score;
var questions = [];
var gameMode;

/* This is called for initial set-up each time you play the game. 
It retrieves the difficulty and game mode that the player has chosen 
and acts accordingly */
function startGame() {
    currentQuestion = 0;
    score = 0;
    gameMode = document.getElementById("game-choice").selectedIndex;
    var result = document.getElementById("difficulty");
    var difficulty = result.options[result.selectedIndex].text;
    var allQuestions = processTextFile(difficulty);
    getRandomisedQuestions(allQuestions);
    var introduction = document.getElementById("start");
    introduction.style.display = "none";
    askQuestion();
}

/* This makes sure that there are no repeat questions within games, 
while also randomising which questions are picked so that there is 
variety in the questions asked and in their order */
function getRandomisedQuestions(allQuestions) {
    questions = [];
    numbers = []
    while (numbers.length < 5) {
        var rand = Math.floor(Math.random() * allQuestions.length);
        if (numbers.indexOf(rand) === -1) {
            numbers.push(rand);
        }
    }
    for (var i = 0; i < 5; i++) {
        questions.push(allQuestions[numbers[i]]);
    }
}

/* This retrieves and processes the text file containing the questions. 
If the question is of the required difficulty level, it is pushed
to an array of question objects */
function processTextFile(difficulty) {
    var allQuestions = [];
    var file = new XMLHttpRequest();
    file.open("GET", "src/input.txt", false);
    file.overrideMimeType('text/plain; charset=UTF-8');
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
            var lines = file.responseText.split('\n');
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].startsWith(difficulty)) {
                    var words = lines[i].split(',');
                    allQuestions.push({
                        english: words[1],
                        french_options: [words[3], words[4], words[5]],
                        answer: words[2]
                    })
                }
            }
        }
    }
    file.send();
    return allQuestions;
}

/* This sets up and displays the question-and-answer part of the game. 
In the case of the options mode, the 3 options are loaded into their respective buttons. 
If all of the questions have been asked, the game is ended. Based on the players score, 
different commentary is output. An option is given to replay */
function askQuestion() {
    document.getElementById("next").style.display = "none";
    var statement = document.getElementById("statement");
    if (currentQuestion < questions.length) {
        statement.textContent = "Guess the french word for '" +
            questions[currentQuestion].english + "':";
        if (gameMode == 0) {
            document.getElementById("one").innerText = questions[currentQuestion].french_options[0];
            document.getElementById("two").innerText = questions[currentQuestion].french_options[1];
            document.getElementById("three").innerText = questions[currentQuestion].french_options[2];
            document.getElementById("options-game").style.display = "block";
        } else if (gameMode == 1) {
            document.getElementById("text-game").style.display = "inline-block";
        }
    } else {
        var commentary;
        if (score < 3) {
            commentary = "You should keep practising..."
        } else if (score < 5) {
            commentary = "You're making good progress!"
        } else {
            commentary = "You're practically fluent!"
        }
        statement.textContent = "Game over! You got " + score +
            " out of " + currentQuestion + " correct.\r\n " + commentary + "\r\n\r\nPlay again?";
        document.getElementById("start").style.display = "inline-block";
    }
}

// This retrieves the text input and sends it to Answer()
function sendTextAnswer() {
    var input = document.getElementById("text-input").value;
    document.getElementById("text-input").value = "";
    answerQuestion(input);

}

/* This checks if the guess parameter is the correct answer. 
Based on the result, different messages are output. A link is given to 
the wordreference dictionary page for the correct french word */
function answerQuestion(guess) {
    if (gameMode == 0) {
        document.getElementById("options-game").style.display = "none";
        guess = questions[currentQuestion].french_options[guess]
    } else if (gameMode == 1) {
        document.getElementById("text-game").style.display = "none";
    }
    var answer = questions[currentQuestion].answer;
    var resultMessage;
    if (guess == answer) {
        resultMessage = "Correct!\r\n The answer was '";
        score++;
    } else {
        resultMessage = "Incorrect, sorry.\r\n The answer was '";
    }
    var answerRef = "https://www.wordreference.com/fren/" + answer;
    var statement = document.getElementById("statement");
    statement.innerHTML = resultMessage + '<a target="_blank" href="' + answerRef + '">' +
        answer + '</a>' + "'.";
    currentQuestion++;
    document.getElementById("next").style.display = "inline-block";
}