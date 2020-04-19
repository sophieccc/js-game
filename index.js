var currentQuestion = 0;
var score = 0;
var words = [];

function Start() {
    processTextFile();
    var startButton = document.getElementById("start");
    startButton.parentNode.removeChild(startButton);
    document.getElementById("statement").style.display = "block";
    Question();
}

function processTextFile() {
    var file = new XMLHttpRequest();
    file.open("GET", "input.txt", false);
    file.overrideMimeType('text/plain; charset=UTF-8');
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
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

function Question() {
    document.getElementById("next").style.display = "none";
    var statement = document.getElementById("statement");

    if (currentQuestion < words.length) {
        statement.textContent = "Guess the french word for " + words[currentQuestion].english + ".";
        document.getElementById("one").innerText = words[currentQuestion].french_options[0];
        document.getElementById("two").innerText = words[currentQuestion].french_options[1];
        document.getElementById("three").innerText = words[currentQuestion].french_options[2];
        document.getElementById("options").style.display = "block";
    } else {
        statement.textContent = "You finished the game! You got a total score of " +
            score + " out of " + currentQuestion + ".";
        document.getElementById("replay").style.display = "inline-block";
    }
}

function Answer(guess) {
    var answer = words[currentQuestion].answer;
    var resultMessage;
    var statement = document.getElementById("statement");
    if (words[currentQuestion].french_options[guess] == answer) {
        resultMessage = "Correct! The answer was " + answer + ".";
        score++;
    } else {
        resultMessage = "Incorrect, sorry. The answer was " + answer + ".";
    }
    statement.textContent = resultMessage;
    currentQuestion++;
    document.getElementById("options").style.display = "none";
    document.getElementById("next").style.display = "inline-block";
}

function Replay() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("replay").style.display = "none";
    Question();
}