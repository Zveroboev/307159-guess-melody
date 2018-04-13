import getElementFromTemplate from '../utils/get-element-from-template';
import store from '../data/store';
import initialState from '../data/initial-state';

// Результат игры: проигрыш закончились попытки
const getLoseLivesScreen = () => {
  const loseLivesScreenTemplate = `
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>
`;
  const loseLivesScreen = getElementFromTemplate(loseLivesScreenTemplate);
  const replayBtn = loseLivesScreen.querySelector(`.main-replay`);

  replayBtn.addEventListener(`click`, () => store.setState(initialState));

  return loseLivesScreen;
};

export default getLoseLivesScreen;
