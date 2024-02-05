import { Questions, questionsContainer, quiz } from "./main.js";

export class Question {
  constructor(index) {
    this.index = index;
    this.question = Questions[index].question;
    this.category = Questions[index].category;
    this.correctAnswer = Questions[index].correct_answer;
    this.inCorrectAnswer = Questions[index].incorrect_answers;
    this.allAnswer = this.setChoices();
    this.score = 0;
    this.answered = false;
  }
  setChoices() {
    return this.inCorrectAnswer.concat(this.correctAnswer).sort();
  }
  displayQuestions() {
    let cartona = `<div class="questionBox d-flex justify-content-center align-items-center animate__animated animate__bounceIn">
        <div class="box d-flex justify-content-center align-items-center flex-column">
            <div class="w-100 d-flex justify-content-between my-3">
                <span class="btn btn-category">${this.category}</span>
                <span class="btn btn-questions">${this.index + 1} of ${
      Questions.length
    } Questions</span>
            </div>
            <h2 class="text-capitalize h4 text-center">${this.question}</h2>
            <ul class="choices w-100 list-unstyled my-3 d-flex justify-content-between flex-wrap text-center">
               ${this.allAnswer
                 .map((answer) => `<li>${answer}</li>`)
                 .join(" ")}  
            </ul>
            <h2 class="text-capitalize h3 text-center score-color fw-bold my-3">
               Score : ${quiz.score}
            </h2>
        </div>
    </div>`;

    questionsContainer.innerHTML = cartona;

    let answerBtn = document.querySelectorAll("ul li");

    for (let i = 0; i < answerBtn.length; i++) {
      answerBtn[i].addEventListener("click", (eventInfo) => {
        eventInfo.target.classList.add("remove-border");
        this.checkAnswer(eventInfo);
      });
    }
  }
  checkAnswer(eventInfo) {
    if (this.answered == false) {
      this.answered = true;
      if (eventInfo.target.innerHTML == this.correctAnswer) {
        quiz.score += 1;
        eventInfo.target.classList.add(
          "correct",
          "animate__animated",
          "animate__pulse"
        );
      } else {
        eventInfo.target.classList.add(
          "wrong",
          "animate__animated",
          "animate__shakeX"
        );
      }
    }
    this.animateQuestion(eventInfo.target, 500);
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".questionBox")
        .classList.replace("animate__bounceIn", "animate__backOutLeft");
    }, duration);

    setTimeout(() => {
      this.nextQuestion();
    }, duration * 2);
  }

  nextQuestion() {
    this.index += 1;
    if (this.index > Questions.length - 1) {
      questionsContainer.innerHTML = quiz.endQuiz();
      let againBtn = document.querySelector(".again");
      againBtn.addEventListener("click", function () {
        location.reload();
      });
      return;
    }
    let question2 = new Question(this.index);
    question2.displayQuestions();
  }
}
