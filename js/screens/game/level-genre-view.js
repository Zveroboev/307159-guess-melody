import audioCache from '../../data/audio-cache';
import AbstractView from '../abstract-view';

export default class GenreView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    audioCache.removeActive();
  }

  get template() {
    return `
      <section class="main main--level main--level-genre">
        <div class="main-wrap">
          <h2 class="title">${this.level.question}</h2>
          <form class="genre">
            ${this.level.answers.map((answer, index) => `
              <div class="genre-answer">
                <div class="player-wrapper">
                  <div class="player">
                    <button class="player-control" data-src="${answer.src}"></button>
                    <div class="player-track">
                      <span class="player-status"></span>
                    </div>
                  </div>
                </div>
                <input type="checkbox" name="answer" value="val-${index + 1}" id="answer-${index + 1}" data-genre="${answer.genre}">
                <label class="genre-answer-check" for="answer-${index + 1}"></label>
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

  onPlayClick(evt, btn) {
    evt.preventDefault();

    // получаем аудио, по которому кликнул пользователь
    const audio = audioCache.getAudio(btn.dataset.src);

    // если активный аудио трек совпадает с тем, по которому кликнули:
    if (audioCache.activeAudio === audio) {
      // проверяем играет ли в данный момент. Играет - останавлиаем. Не играет - запускаем.
      if (audioCache.activeAudio.paused) {
        audioCache.play();
        this.activeAudioBtn = btn;
        this.activeAudioBtn.classList.add(`player-control--pause`);
      } else {
        audioCache.pause();
        this.activeAudioBtn.classList.remove(`player-control--pause`);
      }

      return;
    }

    // если актиный трек есть, но не совпадает:
    if (audioCache.activeAudio && audioCache.activeAudio !== audio) {
      // Останавливаем активный трек, удаляем класс у кнопки активного трека.
      audioCache.stop();
      this.activeAudioBtn.classList.remove(`player-control--pause`);
    }

    audioCache.activeAudio = btn.dataset.src;
    this.activeAudioBtn = btn;

    audioCache.play();
    btn.classList.add(`player-control--pause`);
  }

  onSubmit(evt, answers) {
    evt.preventDefault();

    const checkedAnswersGenre = answers.filter((answer) => answer.checked).map((checkedAnswer) => checkedAnswer.dataset.genre);
    const isCorrect = checkedAnswersGenre.every((genre) => genre === this.level.genre);

    audioCache.stop();
    this.handleAnswer(isCorrect);
  }

  bind() {
    const answers = [...this._elem.querySelectorAll(`input[name="answer"]`)];
    const playButtons = [...this._elem.querySelectorAll(`.player-control`)];
    const answerBtn = this._elem.querySelector(`.genre-answer-send`);
    const form = this._elem.querySelector(`.genre`);

    form.addEventListener(`change`, () => GenreView.onAnswerChange(answers, answerBtn));
    form.addEventListener(`submit`, (evt) => this.onSubmit(evt, answers));
    playButtons.forEach((btn) => btn.addEventListener(`click`, (evt) => this.onPlayClick(evt, evt.target)));
  }
}
