import {getMinutes, getSeconds} from '../../utils/get-time';
import getResultInfo from '../../utils/get-result-info';
import {MAX_LIVES, INITIAL_TIME} from '../../data/constants';
import ReplayView from './replay-view';

export default class WelcomeView extends ReplayView {
  constructor(state, allResults) {
    super();

    this.allResults = allResults;
    this.state = state;
  }

  get template() {
    const {scores, lives, fastAnswers, time} = this.state;
    const totalTime = INITIAL_TIME - time;
    const minutes = getMinutes(totalTime);
    const seconds = getSeconds(totalTime);
    const winMessage = getResultInfo(this.allResults, {scores, lives, totalTime});

    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${minutes}&nbsp;минуты и ${seconds}&nbsp;секунд
          <br>вы&nbsp;набрали ${scores} баллов (${fastAnswers} быстрых)
          <br>совершив ${MAX_LIVES - lives} ошибки</div>
        <span class="main-comparison">${winMessage}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }
}
