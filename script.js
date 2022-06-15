import { questions } from "./assets/js/questions.js";
import { Quiz } from "./assets/models/Quiz.js";
import { Ui } from "./assets/models/Ui.js";

//this variables store the main containers
const dispRules = document.getElementById("disp-rules");
const dispQuiz = document.getElementById("disp-quiz");
const dispScores = document.getElementById("disp-scores");

//stores the button to start the quiz
const startQuiz = document.getElementById("start-quiz");

//stores the div for the countdown and the timebar 
const countdownEl = document.getElementById("countdown");
const timeBarEl = document.getElementById("timeBar");

//p tag for the number of question
const nQuestionEl = document.getElementById("nQuestion");

//table for the score you got in you quiz
const mostRecentScoreEl = document.getElementById("mostRecentScore");

//stores the highest scores from the localstorage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//input button to enter your recent score 
const submitScore = document.getElementById("submit-score");

//stores the input for the username 
const username = document.getElementById("initials");

//stores the form so ican hide it
const hideForm = document.getElementById("hide-form");

//button to reload the page and restart the quiz
const reloadbutton = document.getElementById("reload");

//show text that is hidden
const notEnough = document.getElementById("notEnough");

var time = 100;//total time of the quiz
var stopTimer = 0;//these helps me stop the quiz if the questions are over
var seconds = 0;//prints the resting time each second

var tableScore = 0;//stores the amount of questions answered correctly
var wrongAnswer = 0;//counts the wrong answers

var questionNumber = 0;//prints the number of the question in which the user is in
var numOfQuestion = 0;//amount of questions
var newScores = [];//stores the username, score, and time left



/***************************************************************** */
//esta funcion empieza el timer del quiz y hace que pare cuando se acaban las preguntas o el tiempo
function start() {

    dispRules.style.display = "none";
    dispQuiz.style.display = "block";

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
//esta funcion usa los objetos para imprimir las preguntas y opciones
//tmabien cuenta cuantas preguntas llevas bien y guarda el nuemero de pregunta en la que vas 
//para poder terminar el quiz
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
    nQuestionEl.innerHTML = questionNumber + " of" + numOfQuestion + "questions";
    stopTimer = objectQuiz.questionIndex;
    tableScore = objectQuiz.score;

    //if tableScore + wrongAnswer is less than stopTimer the time will drop 10 seconds
    if ((tableScore + wrongAnswer) < stopTimer) {
        time -= 10;
        seconds -= 10;
        wrongAnswer++;
    }
}


/***************************************************************** */

// muestra el div de html que contiene los scores 
// y muestra los scores guardados en local storage al igual que el score actual
function showScores() {
    dispQuiz.style.display = "none";
    dispScores.style.display = "block";


    //creates the elements for the table of your score  
    let row_1 = document.createElement("tr");
    let td_1 = document.createElement("td");
    let td_2 = document.createElement("td");
    td_1.innerHTML = seconds + "s";
    if (time < 0) {
        td_1.innerHTML = "0"
    }
    td_2.innerHTML = tableScore + "/10";
    row_1.appendChild(td_1);
    row_1.appendChild(td_2);
    mostRecentScoreEl.appendChild(row_1);

    showTableScores();

    //check if the value of the last score in the list is higher than the score the user just got 
    //if it is higher the form to submit your score will not show and text will appear 
    if ((highScores[4].score > tableScore)) {
        hideForm.style.display = "none";
        notEnough.style.display = "block";
    } else {
        hideForm.style.display = "block";
        notEnough.style.display = "none";
    }
}

/***************************************************************** */

//escucha un evento de click para guardar el score con el nombre que pusiste 
//y esconde la intput form para que no puedas guardar el mismo score muchas veces
function saveScores(ev) {
    ev.preventDefault();


    //saves the most recent value
    newScores = {
        name: username.value,
        score: tableScore,
        time: seconds
    }
    //newScore is pushed into highScores so that it can be sorted
    highScores.push(newScores);

    highScores.sort((a, b) => b.score - a.score);
    highScores.sort((a, b) => b.time - a.time);
    highScores.sort((a, b) => b.score - a.score);

    //the last score will cut of by the splice
    highScores.splice(5);

    //highScores is then save into local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));

    //updates the table of high scores
    for (let i = 0; i < highScores.length; i++) {
        document.getElementById("name" + i).innerHTML = highScores[i].name;

        document.getElementById("time" + i).innerHTML = highScores[i].time + "s";

        document.getElementById("scores" + i).innerHTML = highScores[i].score + "/10";
    }

    //hides the form so that one score can be inputed many times
    hideForm.style.display = "none";
}



/***************************************************************** */

//this function shows the container for scores and creates the table of high scores
function showTableScores() {
    const highScoresNames = document.getElementById("highScoresNames");
    const highScoresTime = document.getElementById("highScoresTime");
    const highScoresScores = document.getElementById("highScoresScores");

    //cicle that creates the elements for a grid table
    //it repeats it self as many times as there are saved scores
    for (let i = 0; i < highScores.length; i++) {
        const pTagNames = document.createElement("p");
        const pTagTime = document.createElement("p");
        const pTagScores = document.createElement("p");

        //creates p element for the username
        pTagNames.innerHTML = highScores[i].name;
        pTagNames.id = "name" + i;
        highScoresNames.appendChild(pTagNames);

        //creates p element for the time 
        pTagTime.innerHTML = highScores[i].time + "s";
        pTagTime.id = "time" + i;
        highScoresTime.appendChild(pTagTime);

        //creates p elemen for the score
        pTagScores.innerHTML = highScores[i].score + "/10";
        pTagScores.id = "scores" + i;
        highScoresScores.appendChild(pTagScores);
    }
}


/***************************************************************** */

function reload() {
    reload = location.reload();
}
// Event listeners for reload


/***************************************************************** */

function main() {
    //creates new objects
    const objectQuiz = new Quiz(questions);
    const objectUi = new Ui();

    startQuiz.addEventListener("click", start);

    nextQuestion(objectQuiz, objectUi);

    submitScore.addEventListener("click", saveScores);

    reloadbutton.addEventListener("click", reload, false);
}

main()

