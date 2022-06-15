
import { questions } from "../js/questions.js";
import { Quiz } from "./Quiz.js";

export class Ui {

    constructor() {

    }

    /**
     * 
     * @param {string} textQuestion 
     */

    //prints the text of the question into the html
    showQuestion(textQuestion) {
        const qText = document.getElementById("question");
        qText.innerText = textQuestion;
    }

    /**
     * 
     * @param {string[]} options 
     */

    //creates the buttons for each question
    showOptions(options, nextQuestion) {
        const qOption = document.getElementById("btnchoices");
        qOption.innerHTML = "";

        //creates the the buttons for the the questions
        for (let index = 0; index < options.length; index++) {
            const qButtons = document.createElement("button");
            qButtons.innerText = options[index];
            qButtons.className = "btn";
            qButtons.id = "btn";
            qButtons.addEventListener("click", () => nextQuestion(options[index]));
            qOption.append(qButtons);
        }
    }
}