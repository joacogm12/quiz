import { questions } from "./assets/js/questions.js";
import { Quiz } from "./assets/models/Quiz.js";
import { Ui } from "./assets/models/Ui.js";

const countdownEl = document.getElementById("countdown");
const timeBarEl = document.getElementById("timeBar");

const startQuiz = document.getElementById("start-quiz");

const nQuestionEl = document.getElementById("nQuestion");
const mostRecentScoreEl = document.getElementById("mostRecentScore")
const highScoresEl = document.getElementById("highScores");
const tr = document.createElement("tr");
const tbody = document.createElement("td");

const submitScore = document.getElementById("submit-score");
const username = document.getElementById("initials");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var time = 100;//tiempo total del quiz
var stopTimer = 0;//sirve para parar el timer cuando el quiz se acaba
var seconds = 0;//imprime en el html el tiempo restante

var tablescore = 0;//guarda la cantidad de preguntas contestadas correctamente 

var questionNumber = 0;//imprime en el html el numero de pregunta en el que vas
var numOfQuestion = 0;//cantidad de preguntas en el qui
var newScores = [];//guarda el nombre de usuario, score y el tiempo restante





/***************************************************************** */

//escucha el evento de click para el boton de start quiz y manda a la funcion sta
startQuiz.addEventListener("click", start);

//esta funcion empieza el timer del quiz y hace que pare cuando se acaban las preguntas o el tiempo
function start() {
    document.getElementById("disp-rules").style.display = "none";
    document.getElementById("disp-quiz").style.display = "block";

    //countdown and quiz stopper
    var downloadTimer = setInterval(function () {
        if (time <= 0 || stopTimer == 10) {
            clearInterval(downloadTimer);
            showScores()
        }
        seconds = Math.trunc(time);
        countdownEl.innerText = seconds;
        timeBarEl.style.width = time + "%";
        time -= .01;
    }, 10);
}


/***************************************************************** */

function nextQuestion(objectQuiz, objectUi) {

    numOfQuestion = objectQuiz.questions.length;

    if (objectQuiz.questionIndex <= 9) {
        objectUi.showQuestion(objectQuiz.getQuestionIndex().text);
        objectUi.showOptions(objectQuiz.getQuestionIndex().choices, (textBtnClick) => {
            objectQuiz.check(textBtnClick);
            nextQuestion(objectQuiz, objectUi);
        });
    }

    questionNumber++
    nQuestionEl.innerHTML = questionNumber + " of" + numOfQuestion + "questions";
    stopTimer = objectQuiz.questionIndex;
    tablescore = objectQuiz.score;
}

function main() {
    const objectQuiz = new Quiz(questions);
    const objectUi = new Ui();

    nextQuestion(objectQuiz, objectUi);
}

main()


/***************************************************************** */

// muestra el div de html que contiene los scores 
// y muestra los scores guardados en local storage

function showScores() {
    document.getElementById("disp-quiz").style.display = "none"
    document.getElementById("disp-scores").style.display = "block";


    let row_1 = tr;
    let td_1 = document.createElement("td");
    let td_2 = document.createElement("td");
    td_1.innerHTML = seconds + "s";
    td_2.innerHTML = tablescore + "/10";
    row_1.appendChild(td_1)
    row_1.appendChild(td_2)
    mostRecentScoreEl.appendChild(row_1);
}

/***************************************************************** */

//escuch un evento de click para guardar el score con el nombre que pusiste 
//y esconde la intput form para que no puedas guardar el mismo score muchas veces
submitScore.addEventListener("click", (ev) => {
    ev.preventDefault();

    const newScores = {
        name: username.value,
        score: tablescore,
        time: seconds
    }

    highScores.push(newScores);

    highScores.sort((a, b) => b.score - a.score);
    highScores.sort((a, b) => b.time - a.time);
    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    console.log(highScores);
    console.log(newScores);
})


