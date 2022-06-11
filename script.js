//@ts-check
import { questions } from "./assets/js/questions.js";
import { Quiz } from "./assets/models/Quiz.js";
import { Ui } from "./assets/models/Ui.js";

var tablescore = 0;

/***************************************************************** */

const countdownEL = document.getElementById("countdown");
const timeBarEL = document.getElementById("timeBar");

var time = 100;
var stopTimer = 0;

const startQuiz = document.getElementById("start-quiz");
startQuiz.addEventListener("click", start);

function start() {
    document.getElementById("disp-rules").style.display = "none";
    document.getElementById("disp-quiz").style.display = "block";

    var downloadTimer = setInterval(function () {
        if (time <= 0 || stopTimer == 10) {
            clearInterval(downloadTimer);
            showScores()
        }
        let seconds = Math.trunc(time);
        countdownEL.innerText = seconds;
        timeBarEL.style.width = time + "%";
        time -= .01;
    }, 10);
}


/***************************************************************** */

var questionNumber = 0;
var numOfQuestion = 0

const nQuestionEL = document.getElementById("nQuestion");

function nextQuestion(objectQuiz, objectUi) {

    numOfQuestion = objectQuiz.questions.length;

    if (objectQuiz.questionIndex <= 9) {
        objectUi.showQuestion(objectQuiz.getQuestionIndex().text);
        objectUi.showOptions(objectQuiz.getQuestionIndex().choices, (textBtnClick) => {
            objectQuiz.check(textBtnClick);
            nextQuestion(objectQuiz, objectUi);
        });
    }

    questionNumber++;
    nQuestionEL.innerHTML = questionNumber + " of" + numOfQuestion + "questions";
    stopTimer = objectQuiz.questionIndex
}

function main() {
    const objectQuiz = new Quiz(questions);
    const objectUi = new Ui();

    nextQuestion(objectQuiz, objectUi);

    tablescore = objectQuiz.score
}

main()


/***************************************************************** */

function showScores() {
    document.getElementById("disp-quiz").style.display = "none";
    document.getElementById("disp-scores").style.display = "block";


}

let userScores = [];

const submitScore = document.getElementById("submit-score");
submitScore.addEventListener("click", (ev) => {
    ev.preventDefault();
    const username = document.getElementById("initials").value
    let userScores = {
        username,
        tablescore,
        time
    }

    console.log(userScores);
})


