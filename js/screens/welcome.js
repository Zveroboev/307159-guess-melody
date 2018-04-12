import getElementFromTemplate from '../utils/get-element-from-template';
import getArtistLevelScreen from "./level-artist";
import renderScreen from "../utils/render-screen";
import levels from '../data/levels';
import store from '../data/store';

// Приветствие
const getWelcomeScreen = (state) => {
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
  const handlePlayClick = () => {
    store.setState({currentLevel: `level-1`});

    const newState = store.getState();
    const artistLevelScreen = getArtistLevelScreen(newState, levels);

    renderScreen(artistLevelScreen);
  };

  playBtn.addEventListener(`click`, handlePlayClick);

  return welcomeScreen;
};

export default getWelcomeScreen;
