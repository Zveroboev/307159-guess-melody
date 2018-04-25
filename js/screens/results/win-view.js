import getResultInfo from '../../utils/get-result-info';
import {MAX_LIVES} from '../../data/constants';
import ReplayView from './replay-view';

export default class WelcomeView extends ReplayView {
  constructor(state, allResults) {
    super();

    this.state = state;
    this.allResults = allResults;
  }

  get template() {
    const {scores, lives, time} = this.state;
    const winMessage = getResultInfo(this.allResults, {scores, lives, time});

    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
          <br>вы&nbsp;набрали ${this.state.scores} баллов (0 быстрых)
          <br>совершив ${MAX_LIVES - this.state.lives} ошибки</div>
        <span class="main-comparison">${winMessage}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
  `;
  }
}
