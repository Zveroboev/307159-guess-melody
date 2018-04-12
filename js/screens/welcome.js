import getElementFromTemplate from '../utils/get-element-from-template';
import getArtistLevelScreen from './level-artist';
import getLoseLivesScreen from './lose-lives';
import renderScreen from "../utils/render-screen";
import levels from '../data/levels';
import store from '../data/store';
import getGenreLevelScreen from "./level-genre";

// Приветствие
const getWelcomeScreen = () => {
  const welcomeScreenTemplate = `
    <section class="main main--welcome">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты — за 5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!
        </p>
    </section>
`;

  const welcomeScreen = getElementFromTemplate(welcomeScreenTemplate);
  const playBtn = welcomeScreen.querySelector(`.main-play`);

  const renderNextScreen = () => {
    const state = store.getState();
    const level = levels[state.level];

    if (state.gameStatus === `playing`) {
      const screen = state.type === `artist` ? getArtistLevelScreen(state, level) : getGenreLevelScreen(state, level);

      renderScreen(screen);
    } else if (state.gameStatus === `lose`) {
      const loseLivesScreen = getLoseLivesScreen(state);

      renderScreen(loseLivesScreen);
    } else if (state.gameStatus === `win`) {

    }

  };

  const handlePlayClick = () => {
    store.subscribe(renderNextScreen);
    store.subscribe(() => console.log('---', store.getState()));
    renderNextScreen();
  };

  playBtn.addEventListener(`click`, handlePlayClick);

  return welcomeScreen;
};

export default getWelcomeScreen;
