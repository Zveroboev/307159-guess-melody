import AbstractView from '../abstract-view';


export default class WelcomeView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;
    console.log('---currentLevel', this.level);
  }

  get template() {
    console.log('---this.level', this.level);
    return `
      <section class="main main--level main--level-genre">
        <div class="main-wrap">
          <h2 class="title">Выберите инди-рок треки</h2>
          <form class="genre">
            ${this.level.audios.map((it) => `
              <div class="genre-answer">
                <div class="player-wrapper">
                  <div class="player">
                    <audio src="${it.audio.src}" preload></audio>
                    <button class="player-control player-control--pause"></button>
                    <div class="player-track">
                      <span class="player-status"></span>
                    </div>
                  </div>
                </div>
                <input type="checkbox" name="answer" value="val-${it.audio.id}" id="answer-${it.audio.id}" data-id="${it.audio.id}">
                <label class="genre-answer-check" for="answer-${it.audio.id}"></label>
              </div>
            `).join(` `)}
          
            <button class="genre-answer-send" type="submit" disabled>Ответить</button>
          </form>
        </div>
      </section>
    `;
  }

  static onAnswerChange(answers, btn) {
    const checkedAnswer = answers.find((answer) => answer.checked);

    btn.disabled = !checkedAnswer;
  }

  onSubmit(evt, answers) {
    evt.preventDefault();

    const checkedAnswersID = answers.filter((answer) => answer.checked).map((checkedAnswer) => parseInt(checkedAnswer.dataset.id, 10));
    const correctAnswersID = this.level.audios.filter((audio) => audio.isTrue).map((correctAudio) => correctAudio.audio.id);

    this.handleAnswer(checkedAnswersID, correctAnswersID);
  }

  bind() {
    const answers = [...this._elem.querySelectorAll(`input[name="answer"]`)];
    const answerBtn = this._elem.querySelector(`.genre-answer-send`);
    const form = this._elem.querySelector(`.genre`);

    form.addEventListener(`change`, () => WelcomeView.onAnswerChange(answers, answerBtn));
    form.addEventListener(`submit`, (evt) => this.onSubmit(evt, answers));
  }
}
