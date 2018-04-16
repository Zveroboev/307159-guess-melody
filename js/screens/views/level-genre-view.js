import AbstractView from './abstract-view';
import getLivesTemplate from './lives';
import getTimeTemplate from './time';

export default class WelcomeView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;

    this.answerBtn = null;
    this.answers = [];
  }

  get template() {
    return `
      <section class="main main--level main--level-genre">
        
        ${getTimeTemplate(this.state)}
        
        ${getLivesTemplate(this.state)}
      
        <div class="main-wrap">
          <h2 class="title">Выберите инди-рок треки</h2>
          <form class="genre">
            ${this.level.audios.map((audio) => `
              <div class="genre-answer">
                <div class="player-wrapper">
                  <div class="player">
                    <audio src="${audio.src}" preload></audio>
                    <button class="player-control player-control--pause"></button>
                    <div class="player-track">
                      <span class="player-status"></span>
                    </div>
                  </div>
                </div>
                <input type="checkbox" name="answer" value="${audio.id}" id="${audio.id}">
                <label class="genre-answer-check" for="${audio.id}"></label>
              </div>
            `).join(` `)}
          
            <button class="genre-answer-send" type="submit" disabled>Ответить</button>
          </form>
        </div>
      </section>
    `;
  }

  bind() {
    const form = this._elem.querySelector(`.genre`);

    this.answers = [...this._elem.querySelectorAll(`input[name="answer"]`)];
    this.answerBtn = this._elem.querySelector(`.genre-answer-send`);

    form.addEventListener(`submit`, this.onSubmit);
    form.addEventListener(`change`, this.onAnswerChange);
  }
}
