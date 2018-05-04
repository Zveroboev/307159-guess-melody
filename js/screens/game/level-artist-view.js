import audioCache from '../../data/audio-cache';
import AbstractView from '../abstract-view';

export default class ArtistView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    audioCache.activeAudio = this.level.src;

    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        <div class="main-wrap">
          <h2 class="title main-title">${this.level.question}</h2>
          <div class="player-wrapper">
            <div class="player">
              <button class="player-control"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.level.answers.map((answer, index) => `
              <div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}"/>
                <label class="main-answer" for="answer-${index + 1}" data-correct="${answer.isCorrect}">
                  <img class="main-answer-preview" src="${answer.image.url}"
                       alt="${answer.title}" width="134" height="134">
                  ${answer.title}
                </label>
              </div>
            `).join(` `)}
          </form>
        </div>
      </section>
    `;
  }

  onAnswerClick(evt) {
    const isCorrect = evt.currentTarget.dataset.correct === `true`;

    audioCache.stop();
    this.handleAnswer(isCorrect);
  }

  bind() {
    const answersBtn = [...this._elem.querySelectorAll(`.main-answer`)];
    const playBtn = this._elem.querySelector(`.player-control`);

    playBtn.addEventListener(`click`, () => ArtistView.onPlayClick(playBtn));
    answersBtn.forEach((btn) => btn.addEventListener(`click`, this.onAnswerClick));
  }

  static onPlayClick(btn) {
    if (audioCache.activeAudio.paused) {
      audioCache.play();
      btn.classList.add(`player-control--pause`);
    } else {
      audioCache.pause();
      btn.classList.remove(`player-control--pause`);
    }
  }
}
