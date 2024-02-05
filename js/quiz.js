export class Quiz {
  constructor(category, difficulty, amount) {
    this.category = category;
    this.difficulty = difficulty;
    this.amount = amount;
    this.score = 0;
  }
  async getQuestions() {
    let response = await fetch(
      `https://opentdb.com/api.php?amount=${this.amount}&difficulty=${this.difficulty}&category=${this.category}`
    );
    let data = await response.json();
    console.log(data.results);
    return data.results;
  }
  endQuiz() {
    return `
    <div class="questionEnd h-100 rounded-3 d-flex justify-content-center flex-column align-items-center">
        <h2 class="mb-3">
            ${
              this.score == this.amount
                ? `Congratulations`
                : `Your score is ${this.score}`
            }
        </h2>
        <button class="again btn btn-primary rounded-pill"><i class="fa-solid fa-repeat"></i>Try Again</button>
    </div>`;
  }
}
