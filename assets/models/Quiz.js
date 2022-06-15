//@ts-check
import { Question } from "./Question.js";

export class Quiz {

    questionIndex = 0;//number of the question in which you are
    score = 0;//correct answers

    constructor(questions) {
        this.questions = questions
    }

    //
    getQuestionIndex() {
        return this.questions[this.questionIndex]
    }

    //compares the amount of questions with the number of question you are in
    isEnded() {
        return this.questions.length === this.getQuestionIndex
    }

    //check if the answer is correct
    check(answer) {
        if (this.getQuestionIndex().correctAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
}

