import {MAX_LIVES, INITIAL_TIME} from '../../data/constants';
import getResultInfo from '../../utils/get-result-info';
import declareNoun from '../../utils/declare-a-noun';
import ReplayView from '../replay-view';
import Timer from '../../utils/timer';

export default class WinView extends ReplayView {
  constructor(state, allResults, playerResults) {
    super();

    this.allResults = allResults;
    this.playerResults = playerResults;
    this.state = state;
  }

  get template() {
    const {scores, lives, fastAnswers, time} = this.state;
    const totalTime = INITIAL_TIME - time;
    const timer = new Timer(totalTime);
    const winMessage = getResultInfo(this.allResults, this.playerResults);

    const min = timer.minutes;
    const sec = timer.seconds;
    const mistakes = MAX_LIVES - lives;
    const minWord = declareNoun(min, `минуту`, `минуты`, `минут`);
    const secWord = declareNoun(sec, `секунду`, `секунды`, `секунд`);
    const scoreWord = declareNoun(scores, `балл`, `балла`, `баллов`);
    const fastWord = declareNoun(fastAnswers, `быстрый`, `быстрых`, `быстрых`);
    const mistakesWord = declareNoun(mistakes, `ошибку`, `ошибки`, `ошибок`);

    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${min}&nbsp;${minWord} и ${sec}&nbsp;${secWord}
          <br>вы&nbsp;набрали ${scores} ${scoreWord} (${fastAnswers} ${fastWord})
          <br>совершив ${mistakes} ${mistakesWord}</div>
        <span class="main-comparison">${winMessage}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>
    `;
  }
}
