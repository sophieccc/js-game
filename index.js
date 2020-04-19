var currentQuestion = 0;
var score = 0;
var words = [];

function Start() {
    var startButton = document.getElementById("start");
    startButton.parentNode.removeChild(startButton);
    processTextFile();
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
        statement.textContent = "Guess the french word for " + words[currentQuestion].english + ".";
        for (let element of document.getElementsByClassName("option")) {
            element.style.display = "inline-block";
        }
        document.getElementById("one").innerText = words[currentQuestion].french_options[0];
        document.getElementById("two").innerText = words[currentQuestion].french_options[1];
        document.getElementById("three").innerText = words[currentQuestion].french_options[2];
    } else {
        statement.textContent = "You finished the game! You got a total score of " +
            score + " out of " + currentQuestion + ".";
        document.getElementById("replay").style.display = "inline-block";
    }
}

function Answer(guess) {
    for (let element of document.getElementsByClassName("option")) {
        element.style.display = "none";
    }
    var answer = words[currentQuestion].answer;
    var resultMessage;
    var statement = document.getElementById("statement");
    if (words[currentQuestion].french_options[guess] == answer) {
        resultMessage = "Correct!";
        score++;
    } else {
        resultMessage = "Incorrect, sorry :( .";
    }
    currentQuestion++;
    statement.textContent = resultMessage + " The answer was " + answer + ".";
    document.getElementById("next").style.display = "inline-block";
}

function processTextFile() {
    var file = new XMLHttpRequest();
    file.open("GET", "input.txt", false);
    file.overrideMimeType('text/plain; charset=x-user-defined');
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
            console.log(file.responseText);
            var lines = file.responseText.split('\n');
            for (var i = 0; i < lines.length - 1; i++) {
                var outputs = lines[i].split(',');
                words.push({
                    english: outputs[0],
                    french_options: [outputs[2], outputs[3], outputs[4]],
                    answer: outputs[1]
                })
            }
        }
    }
    file.send();
}