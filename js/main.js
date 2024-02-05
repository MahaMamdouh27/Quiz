import { Question } from "./question.js";
import { Quiz } from "./quiz.js";

let categoryOptions = document.getElementById("categoryOptions");
let difficultyOptions = document.getElementById("difficultyOptions");
let questionNumber = document.getElementById("questionNumber");
let startQuizBtn = document.getElementById("startQuizBtn");
let quizForm = document.querySelector(".quizForm");
export let questionsContainer = document.querySelector(".questions-container");

export let Questions;

export let quiz;

startQuizBtn.addEventListener("click", async function () {
  const category = categoryOptions.value;
  const difficulty = difficultyOptions.value;
  const amount = questionNumber.value;

  quiz = new Quiz(category, difficulty, amount);
  console.log(quiz);

  Questions = await quiz.getQuestions();
  console.log(Questions);
  let question1 = new Question(0);
  console.log(question1);
  quizForm.classList.replace("d-flex", "d-none");
  question1.displayQuestions();
});
