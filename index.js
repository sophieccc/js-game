var currentQuestion = 0;
var score = 0;

function Replay() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("replay").style.display = "none";
    Next()
}

function Start() {
    document.getElementById("start").style.display = "none";
    Next();
}

function Next() {
    document.getElementById("next").style.display = "none";
    var content = ""
    if (currentQuestion < words.length) {
        var question = "<p class='h4'> Guess the french word for " + words[currentQuestion].english + "</p>"
        var option_one = "<div id='options'><button class='btn btn-primary' onclick='Answer(0)'>" + words[currentQuestion].french_options[0] + "</button> "
        var option_two = "<button class='btn btn-primary' onclick='Answer(1)'> " + words[currentQuestion].french_options[1] + "</button> "
        var option_three = "<button class='btn btn-primary' onclick='Answer(2)'> " + words[currentQuestion].french_options[2] + " </button> </div> "
        content = question + option_one + option_two + option_three
    } else {
        content = "<p class='h4'>You finished the game! You got a total score of " + score + " out of " + currentQuestion + ".</p>"
        document.getElementById("replay").style.display = "inline-block";
    }
    document.getElementById('game').innerHTML = content
}

function Answer(guess) {
    var response = ""
    var answer = words[currentQuestion].answer
    if (words[currentQuestion].french_options[guess] == answer) {
        response = "<p class='h4'> Correct! The answer was indeed "
        score++
    } else {
        response = "<p class='h4'> Sorry, you were incorrect. The answer was "
    }
    currentQuestion++
    response += answer + ".</p><p class='h4'>" + "Your score is currently " + score + ".</p>"
    document.getElementById('game').innerHTML = response
    document.getElementById("next").style.display = "inline-block";
}