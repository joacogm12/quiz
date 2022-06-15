// this class creates the object that is going into the array
export class Question {
    /**
     * 
     * @param {string} text 
     * @param {string[]} choices 
     * @param {string} ansewr 
     */

    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    correctAnswer(choice) {
        return choice === this.answer;
    }
}