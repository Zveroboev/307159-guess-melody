import declareNoun from '../../utils/declare-a-noun';
import AbstractView from '../abstract-view';
import {MAX_LIVES, INITIAL_TIME} from '../../data/constants';

const SEC_PER_MIN = 60;

export default class WelcomeView extends AbstractView {

  get template() {
    const min = INITIAL_TIME / SEC_PER_MIN;

    return `
      <section class="main main--welcome">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты — за ${min} ${declareNoun(min, `минуту`, `минуты`, `минут`)} ответить на все вопросы.<br>
          Ошибиться можно ${MAX_LIVES} ${declareNoun(MAX_LIVES, `раз`, `раза`, `раз`)}.<br>
          Удачи!
        </p>
      </section>
    `;
  }

  bind() {
    const playBtn = this._elem.querySelector(`.main-play`);

    playBtn.addEventListener(`click`, this.onGameStart);
  }
}
