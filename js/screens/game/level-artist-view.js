import AbstractView from '../abstract-view';

export default class ArtistView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    this.onAnswerClick = this.onAnswerClick.bind(this);
    console.log('---', this.level);
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
        <div class="main-wrap">
          <h2 class="title main-title">${this.level.question}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.level.src}" preload></audio>
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
                <label class="main-answer" for="answer-${index + 1}" data-id="${index + 1}">
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

  static onPlayClick(btn, audio) {
    if (audio.paused) {
      audio.play();
      btn.classList.add(`player-control--pause`);
    } else {
      audio.pause();
      btn.classList.remove(`player-control--pause`);
    }
  }

  onAnswerClick(evt) {
    const answerID = parseInt(evt.currentTarget.dataset.id, 10);
    const correctAnswerID = this.level.audio.id;

    this.handleAnswer(answerID, correctAnswerID);
  }

  bind() {
    const answersBtn = [...this._elem.querySelectorAll(`.main-answer`)];
    const playBtn = this._elem.querySelector(`.player-control`);
    const audio = this._elem.querySelector(`.player audio`);

    playBtn.addEventListener(`click`, () => ArtistView.onPlayClick(playBtn, audio));
    answersBtn.forEach((btn) => btn.addEventListener(`click`, this.onAnswerClick));
  }
}
