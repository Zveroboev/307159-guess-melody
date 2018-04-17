import AbstractView from './abstract-view';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';

export default class WelcomeView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    this.playBtn = null;
    this.audio = null;
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
                  <img class="main-answer-preview" src="http://placehold.it/134x134"
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

  bind() {
    const answersBtn = [...this._elem.querySelectorAll(`.main-answer`)];

    // Не уверен в корректности этого решения
    this.playBtn = this._elem.querySelector(`.player-control`);
    this.audio = this._elem.querySelector(`.player audio`);

    this.playBtn.addEventListener(`click`, this.onPlayClick);
    answersBtn.forEach((btn) => btn.addEventListener(`click`, this.onAnswerSelected));
  }
}
