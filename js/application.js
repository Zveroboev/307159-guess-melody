import WelcomeScreen from './screens/welcome/welcome-screen';
import ResultScreen from './screens/results/result-screen';
import ErrorScreen from './screens/feedback/error-screen';
import LoadScreen from './screens/feedback/load-screen';
import GameScreen from './screens/game/game-screen';
import store from './data/store';
import Loader from './loader';

const updateState = (levels) => {
  store.setState({levels, lastQuestions: levels.length});
  return levels;
};

export default class Application {
  static start() {
    Application.showLoader();

    Loader
        .loadData()
        .then(updateState)
        .then(Loader.loadAudios)
        .then((audios) => store.setState({audios}))
        .then(Application.showWelcome)
        .catch(Application.showError);
  }

  static showLoader() {
    const loadScreen = new LoadScreen();

    loadScreen.init();
  }

  static showError() {
    const onLoadReplay = Application.start;
    const errorScreen = new ErrorScreen(onLoadReplay);

    errorScreen.init();
  }

  static showWelcome() {
    const onGameStart = Application.startGame;
    const welcomeScreen = new WelcomeScreen(store, onGameStart);

    welcomeScreen.init();
  }

  static startGame() {
    const onEnd = Application.showResult;
    const gameScreen = new GameScreen(store, onEnd);

    gameScreen.init();
  }

  static showResult() {
    const onReplay = Application.startGame;
    const allResults = [];
    const resultScreen = new ResultScreen(store, allResults, onReplay);

    resultScreen.init();
  }
}
