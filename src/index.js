var currentQuestion;
var score;
var words = [];

function Start() {
    currentQuestion = 0;
    score = 0;
    var result = document.getElementById("difficulty");
    var difficulty = result.options[result.selectedIndex].text;
    processTextFile(difficulty);
    var introduction = document.getElementById("start");
    introduction.style.display = "none";
    Question();
}

function processTextFile(difficulty) {
    words = [];
    var file = new XMLHttpRequest();
    file.open("GET", "src/input.txt", false);
    file.overrideMimeType('text/plain; charset=UTF-8');
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
            var lines = file.responseText.split('\n');
            for (var i = 0; i < lines.length - 1; i++) {
                if (lines[i].startsWith(difficulty)) {
                    var outputs = lines[i].split(',');
                    words.push({
                        english: outputs[1],
                        french_options: [outputs[3], outputs[4], outputs[5]],
                        answer: outputs[2]
                    })
                }
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
        statement.textContent = "Game over! You got " +
            score + " out of " + currentQuestion + " correct.\r\n Play again?";
        document.getElementById("start").style.display = "inline-block";
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