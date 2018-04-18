import AbstractView from '../abstract-view';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';

export default class WelcomeView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  get template() {
    return `
      <section class="main main--level main--level-artist">
       
        ${getTimeTemplate(this.state)}
        
        ${getLivesTemplate(this.state)}
        
        <div class="main-wrap">
          <h2 class="title main-title">${this.level.title}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.level.audio.src}" preload></audio>
              <button class="player-control"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.level.answers.map((it) => `
              <div class="main-answer-wrapper">
                <input class="main-answer-r" type="radio" id="answer-${it.id}" name="answer" value="val-${it.id}"/>
                <label class="main-answer" for="answer-${it.id}" data-id="${it.id}">
                  <img class="main-answer-preview" src="${it.image}"
                       alt="${it.name}" width="134" height="134">
                  ${it.name}
                </label>
              </div>
            `)}
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

    console.log('---', answerID, correctAnswerID);

    this.handleAnswer(answerID, correctAnswerID);
  }

  bind() {
    const answersBtn = [...this._elem.querySelectorAll(`.main-answer`)];
    const playBtn = this._elem.querySelector(`.player-control`);
    const audio = this._elem.querySelector(`.player audio`);

    playBtn.addEventListener(`click`, () => WelcomeView.onPlayClick(playBtn, audio));
    answersBtn.forEach((btn) => btn.addEventListener(`click`, this.onAnswerClick));
  }
}
