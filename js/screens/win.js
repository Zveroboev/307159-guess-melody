import getElementFromTemplate from '../utils/get-element-from-template';
import getResultInfo from '../utils/get-result-info';
import initialState from '../data/initial-state';
import {MAX_LIVES} from '../data/constants';
import store from '../data/store';

// Результат игры: выигрыш
const getWinScreen = (state) => {
  const {scores, lives, time} = state;

  const winMessage = getResultInfo([], {scores, lives, time});
  const winScreenTemplate = `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
        <br>вы&nbsp;набрали ${state.scores} баллов (0 быстрых)
        <br>совершив ${MAX_LIVES - state.lives} ошибки</div>
      <span class="main-comparison">${winMessage}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>
  `;
  const winScreen = getElementFromTemplate(winScreenTemplate);
  const replayBtn = winScreen.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, () => store.setState(initialState));

  return winScreen;
};

export default getWinScreen;
