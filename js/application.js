import WelcomeScreen from './screens/welcome/welcome-screen';
import ResultScreen from './screens/results/result-screen';
import ErrorScreen from './screens/feedback/error-screen';
import LoadScreen from './screens/feedback/load-screen';
import GameScreen from './screens/game/game-screen';
import audioCache from './data/audio-cache';
import store from './data/store';
import Loader from './loader';

import {GameStatus, INITIAL_TIME} from './data/constants';

const updateState = (levels) => {
  store.setState({levels, lastQuestions: levels.length});
  return levels;
};

export default class Application {
  static start() {
    Application.showLoader();
    audioCache.clear();

    Loader
        .loadData()
        .then(updateState)
        .then(Loader.loadAudios)
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
    const welcomeScreen = new WelcomeScreen(onGameStart);

    welcomeScreen.init();
  }

  static startGame() {
    const onEnd = Application.showResult;
    const gameScreen = new GameScreen(store, onEnd);

    gameScreen.init();
  }

  static showResult() {
    let onReplay;
    const {time, scores, lives, gameStatus} = store.state;
    const playerResults = {
      id: Date.now(),
      time: INITIAL_TIME - time,
      scores,
      lives
    };

    audioCache.stop();
    audioCache.removeActive();

    switch (gameStatus) {
      case GameStatus.LOSE: {
        onReplay = Application.startGame;

        new ResultScreen(store, null, null, onReplay).init();
        break;
      }
      case GameStatus.WIN: {
        onReplay = Application.start;

        Application.showLoader();
        Loader
            .saveResults(playerResults)
            .then(() => Loader.loadResults())
            .then((results) => new ResultScreen(store, results, playerResults, onReplay).init())
            .catch(Application.showError);
        break;
      }
      default: {
        throw new Error(`Unknown game status`);
      }
    }
  }
}
