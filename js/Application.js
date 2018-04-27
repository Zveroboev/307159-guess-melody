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
    const onLoadReplay = Application.start;
    const loadScreen = new LoadScreen();
    const errorScreen = new ErrorScreen(onLoadReplay);

    loadScreen.init();
    Loader.loadData()
        .then(updateState)
        .then(Application.showWelcome)
        .catch(errorScreen.init());
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
    const onReplay = Application.showWelcome;
    const allResults = [];
    const resultScreen = new ResultScreen(store, allResults, onReplay);

    resultScreen.init();
  }
}
