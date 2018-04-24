import AbstractView from '../abstract-view';

export default class WelcomeView extends AbstractView {
  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
        <h2 class="title">Увы и ах!</h2>
        <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
        <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
      </section>
    `;
  }

  bind() {
    const replayBtn = this._elem.querySelector(`.main-replay`);

    replayBtn.addEventListener(`click`, this.onReplayClick);
  }
}
