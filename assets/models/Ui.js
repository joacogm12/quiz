
import { Quiz } from "./Quiz.js";

export class Ui{

    constructor(){

    }

    /**
     * 
     * @param {string} textQuestion 
     */

    showQuestion(textQuestion){
        const qText = document.getElementById("question");
        qText.innerText = textQuestion;
    }

    /**
     * 
     * @param {string[]} options 
     */
    showOptions(options, nextQuestion){
        const qOption = document.getElementById("btnchoices");
        qOption.innerHTML = "";
        
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