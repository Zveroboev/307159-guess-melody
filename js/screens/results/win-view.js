import {MAX_LIVES, INITIAL_TIME} from '../../data/constants';
import getResultInfo from '../../utils/get-result-info';
import ReplayView from '../replay-view';
import Timer from '../../utils/timer';

export default class WelcomeView extends ReplayView {
  constructor(state, allResults) {
    super();

    this.allResults = allResults;
    this.state = state;
  }

  get template() {
    const {scores, lives, fastAnswers, time} = this.state;
    const totalTime = INITIAL_TIME - time;
    const timer = new Timer(totalTime);
    const winMessage = getResultInfo(this.allResults, {scores, lives, totalTime});

    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${timer.minutes}&nbsp;минуты и ${timer.seconds}&nbsp;секунд
          <br>вы&nbsp;набрали ${scores} баллов (${fastAnswers} быстрых)
          <br>совершив ${MAX_LIVES - lives} ошибки</div>
        <span class="main-comparison">${winMessage}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }
}
