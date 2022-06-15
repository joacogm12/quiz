import { Question } from "../models/Question.js";
import { data } from "./data.js";

//creates an array of object that contain the data of the questions 
export const questions = data.map(question => new Question(question.question, question.choices, question.answer))