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
        var question = "<p> Guess the french word for " + words[currentQuestion].english + "</p>"
        var option_one = "<div id='options'><button onclick='Answer(0)'>" + words[currentQuestion].french_options[0] + "</button> "
        var option_two = "<button onclick='Answer(1)'> " + words[currentQuestion].french_options[1] + "</button>"
        var option_three = "<button onclick='Answer(2)'> " + words[currentQuestion].french_options[2] + " </button></div> "
        content = question + option_one + option_two + option_three
    } else {
        content = "<p>You finished the game! You got a total score of " + score + " out of " + currentQuestion + ".</p>"
        document.getElementById("replay").style.display = "block";
    }
    document.getElementById('game').innerHTML = content
}

function Answer(guess) {
    var response = ""
    var answer = words[currentQuestion].answer
    if (words[currentQuestion].french_options[guess] == answer) {
        response = "<p> Correct! The answer was indeed "
        score++
    } else {
        response = "<p> Sorry, you were incorrect. The answer was "
    }
    currentQuestion++
    response += answer + ". " + "Your score is currently " + score + " out of " + currentQuestion + ".</p>"
    document.getElementById('game').innerHTML = response
    document.getElementById("next").style.display = "block";
}