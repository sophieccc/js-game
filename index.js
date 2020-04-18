var currentQuestion = 0;
var score = 0;

function Replay() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("replay").style.display = "none";
    Question()
}

function Question() {
    if (currentQuestion == 0) {
        document.getElementById("next").style.display = "block";
        document.getElementById("start").style.display = "none";
    }
    var content = ""
    if (currentQuestion < words.length) {
        var question = "<p> Guess the french word for " + words[currentQuestion].english + "</p>"
        var option_one = "<div id='options'><button onclick='Answer(1)'>" + words[currentQuestion].french_options.opt_one + "</button> "
        var option_two = "<button onclick='Answer(2)'> " + words[currentQuestion].french_options.opt_two + "</button>"
        var option_three = "<button onclick='Answer(3)'> " + words[currentQuestion].french_options.opt_three + " </button></div> "
        content = question + option_one + option_two + option_three
    } else {
        content = "<p>You finished the game! You got a total score of " + score + " out of " + currentQuestion + ".</p>"
        document.getElementById("next").style.display = "none";
        document.getElementById("replay").style.display = "block";
    }
    document.getElementById('game').innerHTML = content
}

function Answer(guess) {
    var response = ""
    var answer = words[currentQuestion].answer
    var french_word = ""
    switch (answer) {
        case 1:
            french_word = words[currentQuestion].french_options.opt_one
            break;
        case 2:
            french_word = words[currentQuestion].french_options.opt_two
            break;
        case 3:
            french_word = words[currentQuestion].french_options.opt_three
            break;
    }
    if (guess == answer) {
        response = "<p> Correct! The answer was indeed "
        score++
    } else {
        response = "<p> Sorry, you were incorrect. The answer was "
    }
    currentQuestion++
    response += french_word + ". " + "Your score is currently " + score + " out of " + currentQuestion + ".</p>"
    document.getElementById('game').innerHTML = response
}