var currentQuestion = 0;
var score = 0;

function Start() {
    var startButton = document.getElementById("start");
    startButton.parentNode.removeChild(startButton);

    var statement = document.createElement("p");
    var optionOne = document.createElement("button");
    var optionTwo = document.createElement("button");
    var optionThree = document.createElement("button");

    optionOne.classList = "btn btn-primary";
    optionTwo.classList = "btn btn-primary";
    optionThree.classList = "btn btn-primary";
    optionOne.setAttribute("onclick", "Answer(0)");
    optionTwo.setAttribute("onclick", "Answer(1)");
    optionThree.setAttribute("onclick", "Answer(2)");
    optionOne.id = "one";
    optionTwo.id = "two";
    optionThree.id = "three";
    statement.id = "statement";

    var parent = document.getElementById("game");
    parent.appendChild(statement)
    parent.appendChild(optionOne);
    parent.appendChild(optionTwo);
    parent.appendChild(optionThree);

    Question();
}

function Replay() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("replay").style.display = "none";
    Question();
}

function Question() {
    document.getElementById("next").style.display = "none";
    var statement = document.getElementById("statement");
    if (currentQuestion < words.length) {
        statement.textContent = "Guess the french word for " + words[currentQuestion].english + " .";
        document.getElementById("one").innerText = words[currentQuestion].french_options[0];
        document.getElementById("two").innerText = words[currentQuestion].french_options[1];
        document.getElementById("three").innerText = words[currentQuestion].french_options[2];
    } else {
        var result = document.createElement("p");
        statement.textContent = "You finished the game! You got a total score of " + score +
            " out of " + currentQuestion + ".";

        document.getElementById("replay").style.display = "inline-block";
    }
}

function Answer(guess) {
    var response
    var answer = words[currentQuestion].answer;
    if (words[currentQuestion].french_options[guess] == answer) {
        response = "<p class='h4'> Correct!";
        score++;
    } else {
        response = "<p class='h4'> Incorrect, sorry :( .";
    }
    currentQuestion++;
    response += " The answer was " + answer + ".</p><p class='h4'>" + "Your score is currently " +
        score + ".</p>";
    document.getElementById('game').innerHTML = response;
    document.getElementById("next").style.display = "inline-block";
}